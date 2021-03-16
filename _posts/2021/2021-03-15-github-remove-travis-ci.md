---
layout: post
title: Remove Travis CI from GitHub
date: 2021-03-15 20:58:09
excerpt: How to remove Travis CI from your GitHub's personal account, organization account, and repositories.
categories: github travis ci
---

This article goes over how to remove [Travis CI](https://b.remarkabl.org/travis-ci) from your [GitHub](https://b.remarkabl.org/github-site)'s:

- [Personal account](#personal)
- [Organization account](#organization)
- [Repository](#repository)

## Personal

Revoke Travis CI from [Account settings](https://github.com/settings) > [Applications](https://github.com/settings/applications):

![Revoke Travis CI from personal account settings Applications]({{ "/images/2021/2021-03-15-personal-applications-revoke-travis-ci.png" | prepend: site.assets_path }})

In [Applications](https://github.com/settings/applications), check if Travis CI is added in:

- [Installed GitHub Apps](https://github.com/settings/installations)
- [Authorized GitHub Apps](https://github.com/settings/apps/authorizations)

## Organization

Deny Travis CI access from [Organization](https://github.com/settings/organizations) > Account settings > Third-party access:

![Deny Travis CI access from organization account settings Third-party access]({{ "/images/2021/2021-03-15-organization-third-party-access-deny-access-travis-ci.png" | prepend: site.assets_path }})

In Account settings, check if Travis CI is added in:

- Webhooks
- Installed GitHub Apps

## Repository

### Config

Delete [.travis.yml](https://docs.travis-ci.com/user/customizing-the-build) from your repository root.

### Branches

Uncheck Travis CI status checks from your repository Settings > Branches > [Branch protection rules](https://docs.github.com/en/github/administering-a-repository/managing-a-branch-protection-rule):

- Travis CI - Branch
- Travis CI - Pull Request

Don't forget to save your changes.

### Webhooks

Delete Travis CI from your repository Settings > Webhooks:

![Delete Travis CI from repository Webhooks]({{ "/images/2021/2021-03-15-repository-delete-travis-ci-webhook.png" | prepend: site.assets_path }})

## Travis CI

Finally, don't forget to change your [plan](https://travis-ci.com/account/plan) to the free one so you stop paying.
