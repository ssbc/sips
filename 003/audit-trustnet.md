<!--
SPDX-FileCopyrightText: 2021 Anders Rune Jensen

SPDX-License-Identifier: CC-BY-4.0
-->

## Index audits

Indexes can be seen as a *claim*, in that, these are the messages
matching a query. It is important that these are accurate and thus
other nodes in the network should audit these. Thus catching malicious
nodes but also simple programming errors.

An auditor verifies an index by being in possesion of the same mesages
and verifies that no messages are left out and that the index is not
growing stale. Anyone can be an auditor, trust is assigned to auditors
as described in the next section. This should keep bad auditors out of
the system.

After verifying an index feed, a message is posted on the audit feed:

```
{ 
  type: 'index/audit', 
  latestseq: x, 
  subfeed: '@index1.ed25519', 
  metafeed: '@mf.bbfeed-v1', 
  status: 'verified' 
}
```

Because the messages on feeds are immutable, once a feed has been
verified up until sequence x, the past can never change. This holds
true because the network will only accept new messages on a feed that
correctly extends the existing feed.

In order not to create too many verification messages, a new message
should only be posted if an index is no longer valid or it has grown
stale. How often indexes should be verified is at the discretion of
the auditor.

An index feed is considered stale if that has not been updated a week
after a message is posted on the indexed feed. These should be posted
as:

```
{ 
  type: 'index/audit', 
  latestseq: x, 
  subfeeed: '@index2.ed25519', 
  metafeed: '@mf.bbfeed-v1', 
  status: 'stale',
  reason: 'not updated since 2021-06-25'
}
```

In case an index is invalid, the following kind of message should be
posted:

```
{ 
  type: 'index/audit', 
  latestseq: x, 
  subfeeed: '@index2.ed25519', 
  metafeed: '@mf.bbfeed-v1', 
  status: 'invalid',
  reason: 'Missing the message %hash.sha256 with sequence 100'
}
```

In the case where an index is no longer valid, the index feed and all
messages referenced from this feed should be removed from the local
database. After this, another index needs to be found an used instead.

It is worth noting that it is limited what a malicious peer could
do. The messages referenced in an index still needs to be signed by
the author, so at worst messages can be left out.

## Trust

Trust is a meta feed that contains one feed for each trust area with
ratings within that area as defined in [trustnet]. One area where this
will be used is for delegating trust related to verification of
indexes:

```
{ 
  type: 'metafeed/add', 
  feedpurpose: 'trustassignments', 
  subfeed: '@assignments.ed25519',
  area: 'indexaudits'
}
```

A trust assignment:

```
{ 
  type: 'trustnet/assignment', 
  src: '@mf.bbfeed-v1', 
  dest: '@othermf.bbfeed-v1',
  weight: 1.0 
}
```

Notice we use the meta feed as the destination. The index subfeed of
the destination is given by the area and layout of meta feeds.

## Replication

If that is not found, one uses trusted index audits feeds to find an
index that can be used. Trusted is defined as:

A target feed is trusted if:
 -  One has assigned any positive, non-zero amount of trust to the
    target feed, or
 - the trustnet calculation returns the feed as trusted

A trustnet calculation is performed as:
 - All positive, non-zero first order (direct) trust assignments are always
   returned as trusted.
 - If there are no first-order trust assignments with a trust weight exceeding
   `TrustNet.trustThreshold`, computation is shortcircuited and only the first
   order trust assignments are returned. 
 - If there is at least one first-order trust assignment exceeding the trust
   threshold, then [Appleseed] ranks are calculated for the given trust graph.
 - TrustNet's trusted feeds are then calculated by breaking the Appleseed
   rankings into 3 ckmeans clusters, and discarding the cluster of with the lowest ranks. 
 - If any direct trust assignments are not included in the top 2 clusters, then
   they are added to the concatenation of the top 2 clusters before returning
   the result as the trustnet calculation.

If no verified indexes are available one should fall back to full
replication of that main feed.

A random new user will at first not trust anyone and thus can't do
partial replication. On the other hand if they are onboarded using
someone they know and trust that would enable partial replication.

Lets look at how onboarding could work for Alice that got invited by
Bob. First alice downloads Bobs main feed. She then trusts Bob and
downloads Bobs meta feed, all trust assignments, indexes and
audits. By using the metafeed field on trust assignments, Alice is
able to recursively download trust assignments, their audits and from
that decide what indexes to be used.

[Appleseed]: https://github.com/cblgh/appleseed-metric 
[trustnet]: https://github.com/cblgh/trustnet
