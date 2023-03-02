<!--
SPDX-FileCopyrightText: 2021 Andre 'Staltz' Medeiros

SPDX-License-Identifier: CC-BY-4.0
-->

---
theme: gaia
_class: lead
paginate: true
backgroundColor: #fff
backgroundImage: url('https://marp.app/assets/hero-background.jpg')
marp: true
---

# Meta feeds :curling_stone:

Presentation for SSB's NGI Pointer advisor meeting

**Presenter:** Andre Staltz
**Co-presenter:** Alexander Cobleigh
**Author:** Anders Rune Jensen

---

# Context

Currently, all SSB feeds in production have:

- An $Ed25519$ identity
- Unbounded length
- Messages of various types

---

# Problem

- An $Ed25519$ identity
  - Ties all of the content on this feed to this keypair
- Unbounded length
  - As feeds grow, replication gets heavier
- Messages of various types
  - Replicators have no choice in replicating only some types, it's either all or none

---

# Problem

No way to split content across separate feeds **while keeping the same identity**.

---

# Solution

- Introduce 2 *hierarchies* of feeds:
  - **Root feed**
  - **Subfeed**
- Introduce 3 *kinds* of feeds:
  - **Meta feed**
  - **Content feed**
  - **Index feed**

---

# Solution

*Hierarchies* of feeds:

- **Root feed**
  - Its *kind* is necessarily a **meta feed**
  - Functions as the **identity** of a person or user
- **Subfeed**
  - Is either a **content feed**, an **index feed**, or another **meta feed**

---

# Solution

*Kinds* of feeds:

- **Meta feed**
  - Publishes only messages with metadata on other feeds
- **Content feed**
  - Publishes messages with actual content
- **Index feed**
  - Publishes messages which point to (contain a cypherlink of) messages that belong to other feeds

---

# Meta feed

*Genesis*

Uses [Hashed Key Derivation Function (HKDF)](https://en.wikipedia.org/wiki/HKDF) to generate a seed for $Ed25519$.

```js
// JavaScript
const seed = crypto.randomBytes(32)
const prk = hkdf.extract(lhash, hash_len, seed, salt)
const mf_info = "ssb-meta-feed-seed-v1:metafeed"
const mf_seed = hkdf.expand(hash, hash_len, prk, length, mf_info)
const mf_key = ssbKeys.generate("ed25519", mf_seed)
```

---

# Meta feed

*Message schema*

- Messages published on a meta feed have a schema that encodes a vocabulary to describe subfeeds
- The schema covers:
  - **Identity** of the subfeed
  - **Lifetime** of the subfeed
  - **Purpose** of the subfeed
  - **Format** of the messages on the subfeed

---

# Meta feed

*Message schema*

```js
{
  "type": "metafeed/operation",
  "id": "@1nf..A3U=.ed25519", // Identity
  "operation": "add",         // Lifetime
  "purpose": "main",          // Purpose
  "feedtype": "classic"       // Type
}
```

---

# Use case: partial replication

- Given an existing old-style SSB feed, *main*
- **Meta feed** publishes metadata on *main* as a subfeed
- *Main* announces itself to belong to **meta feed**
- **Meta feed** publishes metadata on a new **index feed**
- The **index feed** is dedicated to a subset of messages on *main*
- Replicators can replicate the **index feed** and fetch only that subset
- E.g. an index feed for `about` messages

---

# Use case: *same-as*

- Given two old-style SSB feeds, *desktop* and *mobile*
- **Meta feed** publishes metadata on *desktop* as a subfeed
- **Meta feed** publishes metadata on *mobile* as a subfeed
- *Desktop* announces itself to belong to **meta feed**
- *Mobile* announces itself to belong to **meta feed**
- Replicators following the **meta feed** are aware of both subfeeds

---

# Use case: new feed formats

- Backwards-compatible path to support new feed formats
- Given an existing old-style SSB feed, *main*
- Given a new SSB feed format, *neo*
- **Meta feed** publishes metadata on *main* as a subfeed
- **Meta feed** publishes metadata on *neo* as a subfeed
- *Main* announces itself to belong to **meta feed**
- *Neo* announces itself to belong to **meta feed**
- Replicators following the **meta feed** are aware of both subfeeds

---

# Open questions

*Ephemeral feeds*

The root (meta) feed is not partially replicated, and it's assumed to not support deletions (?), so the costs of created ephemeral just-in-time subfeeds is not negligible. How to efficiently support ephemeral feeds?

---

# Open questions

*Fragility of the root feed*

What happens when $Ed25519$, the scheme used by the root feed, is broken? How do we guarantee the long-term survival of the specifications on the root feed?

---

# Open questions

*Jevons paradox*

> Increasing the efficiency with which a resource is used, but the rate of consumption of that resource rises due to increasing demand.

E.g. with meta feeds in SSB, now that it's "cheap" to create subfeeds for alternative feed formats etc, will we have *more* storage consumed (as opposed to *less*, which is the goal of partial replication)?

---

# Thank you

# :pray:

Link: https://github.com/ssb-ngi-pointer/ssb-meta-feed

