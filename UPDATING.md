# Updating a SIP

There are generally two types of "updates" to a SIP.

## 1. Minor tweaks

These include changes such as:

- Fixing typos and grammar
- Adding more non-normative examples or diagrams
- Adding more informative references
- Improving the abstract or motivation sections
- Adding a security consideration
- Update contact information

For those cases, just submit a pull request that changes the SIP document.

## 2. Breaking changes

These include changes such as:

- Changing the specification such that implementations will have to change
- Changing the normative references
- Changing the abstract or motivation sections in a way that changes the scope and applicability of the SIP

For these kinds of changes **do not change the SIP document**. Instead, submit a new SIP proposal that supersedes the old one. The new SIP should reference the old one, and explain why the new one should be preferred over the old one. It is okay to copy-paste the old SIP into the new one, and then make the changes.

The reason for this is that we want to allow SIPs to be immutable, such that implementers can say that they implement a certain SIP, and not have to have versioning.
