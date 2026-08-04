# Contributing to Cube UI

Thanks for your interest in contributing to Cube UI. To create an open space for the community, we ask that you read through and follow the guidelines in this document.

## Contents

- [Contributing to Cube UI](#contributing-to-cube-ui)
  - [Contents](#contents)
  - [Code of conduct](#code-of-conduct)
  - [Prerequisites](#prerequisites)
    - [Create a GitHub account](#create-a-github-account)
    - [Setup Git commit signing](#setup-git-commit-signing)
  - [How to contribute](#how-to-contribute)
  - [Developer Origin Certificate (DCO)](#developer-origin-certificate-dco)
  - [Adding a changeset](#adding-a-changeset)

## Code of conduct

We strive to maintain a positive community, guided by our [CODE_OF_CONDUCT](/CODE_OF_CONDUCT.md).

You can reach out to us at [community@bigstack.co](mailto:community@bigstack.co)

## Prerequisites

### Create a GitHub account

Create a [GitHub](https://github.com/signup) account if you haven't already.

### Setup Git commit signing

Git commit signing is a process that uses cryptographic signatures (GPG or SSH keys) to verify the authenticity of a commits' author, ensuring that the commit was created by a trusted identity and hasn't been tampered with. We require our contributors to sign their commits to stay secure and validate developer origin certificate sign offs. Setup [Git commit signing](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits)

## How to contribute

We welcome contributions in the form of:

- Updating documentation (Upcoming)
- Reporting issues to us
- Sharing your stories in Slack or Discord
- Bug fix or feature enhancement

Please **do not** report any **security** issues in the issue tracker or a pull request. Please refer to our [security](/SECURITY.md) page on how to report and reach us.

Before your pull request can be merged, it needs at least one maintainer approval, and every review
conversation on it needs to be resolved. CI (typecheck, lint, build, unit tests) also has to pass.

## Developer Origin Certificate (DCO)

All Bigstack co., ltd open source projects adopt the [Developer Origin Certificate v1.1](https://developercertificate.org/) to ensure contributions are properly authorized and compliant with open-source standards.

Git commit sign-off is a declaration by you that you adhere to the Developer Certificate of Origin (DCO), adding a `Signed-off-by:` line in the commit message to confirm you authored or have permission to contribute the changes. The DCO is easily done with the `--signoff (-s)` in Git. For example,

```bash
git commit -s -m "Description of the commit"
```

## Adding a changeset

This repository publishes `@bigstack-oss/cube-ui` to npm automatically: merging to `main` versions
and releases the package based on [changesets](https://github.com/changesets/changesets). If your
pull request changes anything under `packages/ui` that should ship in the next release, add a
changeset before requesting review:

```bash
pnpm changeset
```

Follow the prompts to pick a bump type (patch/minor/major) and describe the change - this becomes
the changelog entry. Commit the generated file under `.changeset/`. Pull requests that only touch
docs, tests, or tooling usually don't need one.
