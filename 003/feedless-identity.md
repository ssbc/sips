<!--
SPDX-FileCopyrightText: 2021 Anders Rune Jensen

SPDX-License-Identifier: CC-BY-4.0
-->

**Notice**: this concept/draft was merged into https://github.com/ssb-ngi-pointer/fusion-identity-spec. This is just still here for archival purposes.

Feedless identity is a concept where multiple regular identities are
linked together with a specific purpose. The identity will have keypair that is
shared with the linked members. The reason it is called feedless is
because, as the name implies, all messages related to the identity is
posted on the feeds of the members of an feedless identity.

Each identity should have a feed containing messages related to
feedless identities it is linked to. Each feedless identity works by
mutual consent, meaning as long as all the members of an identity are
mutually linked, the identity is considered valid. Any member of the
identity can revoke the validity of an identity by creating a
tombstone message.

To create a new feedless identity, a keypair is created and the
identity is announced:

```
{ type: 'feedless/create', identity: '@id', name: 'arj' }
```

The identity can then be linked between identities:

```
{ type: 'feedless/link', identity: '@id', from: '@mf', to: '@othermf', tangles: { feedless: { root: '%abc', previous: '%abcd' } } }
```

Once @othermf posts a similar message in their feedlessidentity
subfeed, the identity is linked and the creator of the identity should
send the private key of the identity to the new member. Messages of a
feedless identity are tangled using the initial message as the root.

The identity can be extended with new members by having any currrent
member linking the new member and the new new member linking back. The
reason why we don't need full consensus from existing members is that
it slows down the process of adding new members. One could always
build an internal process within an identity and if someone sidesteps
this process it is public knowledge. In any case it seems like a
bigger issue that somewould would leak the secret key to a person
outside the group.

Any member can revoke the feedless identity by posting the following
message:

```
{ type: 'feedless/tombstone', identity: '@id', tangles: { feedless: { root: '%abc', previous: '%abcd' } } }
```

Once another member sees this message they should also post a
tombstone message, this is to make it harder for an adversary to try
and keep the identity alive by withholding new messages after one of
the identities has been compromised. It is up to the members to create
a new feedless identity as the existing is now considered void and
should not be used.

For the name to be changed, it must be done in a consensus fashion,
meaning all members must post a message acking the name:

```
{ type: 'feedless/name', identity: '@id', name: 'arj', tangles: { feedless: { root: '%abc', previous: '%abcd' } } }
```

It might also be possible to operate with identities where instead of
full censensus only a quorum (such as 2/3) is needed for a name
change.

A new identity added to the feedless identity can merge these messages
by including the name in the link message.

These feedless identities thus act as public groups. They work best
for smaller groups where the members should be publicly known. For
larger groups, [private-groups] should be considered instead.

If a feedless identity A is added as a member of another feedless
identity B (group of groups) then just one member of A needs to link
back. A new `representative` field of the link message from B should
point to any member of A. It doesn't have to be the member linking
back as the list of members can be deduced from that member.

For a good starting point for existing discussions on SSB going back 5
years (linked in the thread):
%YaWEWHDWAY6p/g9zIwCJovsd1SUyHpwuGGz3Ug/jtW8=.sha256

Mix & arj talk (also added to this repo): 
 - https://hackmd.io/iQlUz8nBSeecrrb5mQtcUQ
 - https://hackmd.io/AHdW4Z6lTAqEfPxEkSuSvQ?both
