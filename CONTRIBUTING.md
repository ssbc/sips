# Contributing a new SIP

There are generally two types of SIPs that can be submitted:

- Specifications of existing SSB functionality
- Proposals for new SSB functionality

Specs for existing SSB functionality are generally straightforward to accept, and we highly encourage and appreciate you for doing so!

For new proposals, the review process may be more involved. This is because we want to ensure that your proposal is (1) related to SSB, (2) has a reference implementation, (3) makes sense and could improve SSB.

For an easy process, please follow these steps:

## 1. Fork this repo

## 2. Copy the file `TEMPLATE.md` into `000.md`

## 3. Edit `000.md`

We recommend using TEMPLATE.md as a starting point, such that you can just fill
in the blanks. Not all sections are mandatory.

- Title, author, date, license: **mandatory**
- Abstract: **mandatory**
- Motivation: optional
- Terminology: optional
- Specification: **mandatory**
- Considerations: optional
- Normative references: optional
- Informative references: optional
- Reference implementation: **mandatory**

Here are what those sections mean:

**Title:** The title of your SIP. Typically a short description in maximum 8 words. Preferably should NOT contain the word "SSB" nor the word "specification".

**Abstract:** A single paragraph that describes the problem your SIP addresses and a summary of the solution. Use at most 250 words.

**Motivation:** A few paragraphs that give the context for this SIP. Why is this important? What is the problem? Use at most 1000 words.

**Terminology:** A short section defining the terminology used in your SIP. We recommend including the below in most cases:

> The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC 2119](https://tools.ietf.org/html/rfc2119).

**Specification:** A detailed description of the solution. You can use diagrams and examples to help explain your proposal, but prefer to use "SHOULD"/"MUST" textual descriptions as the official source of truth for the specification. There is no maximum length for this section, but we encourage to be brief and simple. After all, you want people to implement your proposal. This section is important because it is the ONLY part of your SIP that is normative. The rest of the document is informative.

**Considerations:** A section that discusses the tradeoffs of your proposal. We recommend addressing *Security Considerations*, *Privacy Considerations*, and/or *Compatibility Considerations* (describes how your proposal is compatible or incompatible with other SIPS).

**Normative references:** A list of SIPs and RFCs that your SIP depends on.

**Informative references:** A list of other links that are relevant to your SIP.

**Reference implementation:** A link to a reference implementation of your proposal. The reference implementation is not "normative", because the specification section should be sufficient. But it is very helpful for both reviewers and implementers.

**Extras:** for more informative sections, you can "Appendix A.", "Appendix B.", etc to the end of your SIP. You can also add files (source code or test vectors) to a folder called `000` which will then be renamed with the appropriate number when your SIP is merged. But please keep the size of the folder small, and prefer to use text to describe your proposal.

## 4. Submit a pull request

Open a pull request targetting this repo, and ask for review from other stakeholders such as implementers in the SSB community or other SIP authors.

## 5. Review process

The review should be done according to the [REVIEWING.md](REVIEWING.md).

Once the reviewer merges your PR, the file `000.md` will be renamed to an appropriate new number, and your SIP will be listed on the README.md table.

Congratulations!
