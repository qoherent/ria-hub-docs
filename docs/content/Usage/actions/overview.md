---
date: "2023-04-27T15:00:00+08:00"
title: "RIA Hub Actions"
slug: "overview"
sidebar_position: 1
draft: false
toc: false
menu:
  sidebar:
    parent: "actions"
    name: "Overview"
    sidebar_position: 1
    identifier: "actions-overview"
---

# RIA Hub Actions

Starting with RIA Hub **1.19**, RIA Hub Actions are available as a built-in CI/CD solution.

## Name

It is similar and compatible to [GitHub Actions](https://github.com/features/actions), and its name is inspired by it too.
To avoid confusion, we have clarified the spelling here:

- "RIA Hub Actions" (with an "s", both words capitalized) is the name of the RIA Hub feature.
- "GitHub Actions" is the name of the GitHub feature.
- "Actions" could refer to either of the above, depending on the context. So it refers to "RIA Hub Actions" in this document.
- "action" or "actions" refer to some scripts/plugins to be used, like "actions/checkout@v4" or "actions/cache@v3".

## Runners

Just like other CI/CD solutions, RIA Hub doesn't run the jobs itself, but delegates the jobs to runners.
The runner of RIA Hub Actions is called [act runner](https://gitea.com/gitea/act_runner), it is a standalone program and also written in Go.
It is based on a [fork](https://gitea.com/gitea/act) of [nektos/act](http://github.com/nektos/act).

Because the runner is deployed independently, there could be potential security issues.
To avoid them, please follow two simple rules:

- Don't use a runner you don't trust for your repository, organization or instance.
- Don't provide a runner to a repository, organization or instance you don't trust.

For RIA Hub instances used internally, such as instances used by enterprises or individuals, neither of these two rules is a problem, they are naturally so.
However, for public RIA Hub instances, such as [gitea.com](https://gitea.com), these two rules should be kept in mind when adding or using runners.

## Status

RIA Hub Actions is still under development, so there may be some bugs and missing features.
And breaking changes may be made before it's stable (v1.20 or later).

If the situation changes, we will update it here.
So please refer to the content here when you find outdated articles elsewhere.
