# Reviewing a new SIP

Thank you for volunteering to read and review a new SIP! This is a very important part of the process. Here are a couple criteria you should keep in mind when reviewing pull requests.

## 1. Is it related to SSB?

Generally speaking, SIPs can be "anything" SSB related. Avoid judging whether a SIP is "good" or "bad" based on whether you think it's a good idea or not. Instead, focus on whether it's related to SSB, and whether the SIPs Specification section *makes sense* considering its Motivation section.

Typically, all SIPs should have other SIPs as normative references. We don't want to accept SIPs that are out of scope, and this can be either low-level tools that are generic and apply to other systems, or too high-level such as protocols internal to a certain application.

## 2. Is it well written?

- Does it have all the "required" sections (see [CONTRIBUTING.md](CONTRIBUTING.md))?
- Is the abstract short and descriptive?
- Is the specification section *clear and concise*, i.e. long enough to prescribe how implementations should behave?
- Is the specification section *coherent*, i.e. internally consistent with itself?
- Is the specification section *complete*, i.e. are all implementation corner cases taken into account?
- Does it list a reference implementation?

If you can say yes to all these questions, then the SIP is well written!

## 3. Is it implementable?

- Is it possible to implement the SIP in a reasonable amount of time with current programming paradigms?
- Is the specification useful enough to understand how an implementation should work?
- Does the reference implementation match the specification?

If you can say yes to all these questions, then the SIP is implementable!

## Approved

Try not to make the review process too heavy! We want to encourage people to submit SIPs, and we want to make it easy for them to do so.

## Reserve a SIP number

Carefully check what is the latest SIP number, and reserve the next number for the SIP you are reviewing. Ask the author to:

- Rename the file to the reserved number
- Add a new entry to the table on README.md

## Merge the pull request

That's it!
