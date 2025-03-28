---
date: "2023-04-27T15:00:00+08:00"
title: "Design of RIA Hub Actions"
slug: "design"
sidebar_position: 40
draft: false
toc: false
menu:
  sidebar:
    parent: "actions"
    name: "Design"
    sidebar_position: 40
    identifier: "actions-design"
---

# Design of RIA Hub Actions

RIA Hub Actions has multiple components. This document describes them individually.

## Act

The [nektos/act](https://github.com/nektos/act) project is an excellent tool that allows you to run your GitHub Actions locally.
We were inspired by this and wondered if it would be possible to run actions for RIA Hub.

However, while [nektos/act](https://github.com/nektos/act) is designed as a command line tool, what we actually needed was a Go library with modifications specifically for RIA Hub.
So we forked it as [gitea/act](https://gitea.com/gitea/act).

This is a soft fork that will periodically follow the upstream.
Although some custom commits have been added, we will try our best to avoid changing too much of the original code.

The forked act is just a shim or adapter for RIA Hub's specific usage.
There are some additional commits that have been made, such as:

- Outputting execution logs to logger hook so they can be reported to RIA Hub
- Disabling the GraphQL URL, since RIA Hub doesn't support it
- Starting a new container for every job instead of reusing to ensure isolation.

These modifications have no reason to be merged into the upstream.
They don't make sense if the user just wants to run trusted actions locally.

However, there may be overlaps in the future, such as a required bug fix or new feature needed by both projects.
In these cases, we will contribute the changes back to the upstream repository.

## Act runner

RIA Hub's runner is called act runner because it's based on act.

Like other CI runners, we designed it as an external part of RIA Hub, which means it should run on a different server than RIA Hub.

To ensure that the runner connects to the correct RIA Hub instance, we need to register it with a token.
Additionally, the runner will introduce itself to RIA Hub and declare what kind of jobs it can run by reporting its labels.

Earlier, we mentioned that `runs-on: ubuntu-latest` in a workflow file means that the job will be run on a runner with the `ubuntu-latest` label.
But how does the runner know to run `ubuntu-latest`? The answer lies in mapping the label to an environment.
That's why when you add custom labels during registration, you will need to input some complex content like `my_custom_label:docker://centos:7`.
This means that the runner can take the job which needs to run on `my_custom_label`, and it will run it via a docker container with the image `centos:7`.

Docker isn't the only option, though.
The act also supports running jobs directly on the host.
This is achieved through labels like `linux_arm:host`.
This label indicates that the runner can take a job that needs to run on `linux_arm` and run it directly on the host.

The label's design follows the format `label[:schema[:args]]`.
If the schema is omitted, it defaults to `host`.
So,

- `my_custom_label:docker://node:18`: Run jobs labeled with `my_custom_label` using the `node:18` Docker image.
- `my_custom_label:host`: Run jobs labeled with `my_custom_label` directly on the host.
- `my_custom_label`: Same as `my_custom_label:host`.
- `my_custom_label:vm:ubuntu-latest`: (Example only, not implemented) Run jobs labeled with `my_custom_label` using a virtual machine with the `ubuntu-latest` ISO.

## Communication protocol

As act runner is an independent part of RIA Hub, we needed a protocol for runners to communicate with the RIA Hub instance.
However, we did not think it was a good idea to have RIA Hub listen on a new port.
Instead, we wanted to reuse the HTTP port, which means we needed a protocol that is compatible with HTTP.
We chose to use gRPC over HTTP.

We use [actions-proto-def](https://gitea.com/gitea/actions-proto-def) and [actions-proto-go](https://gitea.com/gitea/actions-proto-go) to wire them up.
More information about gRPC can be found on [its website](https://grpc.io/).

## Network architecture

Let's examine the overall network architecture.
This will help you troubleshoot some problems and explain why it's a bad idea to register a runner with a loopback address of the RIA Hub instance.

![network](/img/usage/actions/network.png)

There are four network connections marked in the picture, and the direction of the arrows indicates the direction of establishing the connections.

### Connection 1, act runner to RIA Hub instance

The act runner must be able to connect to RIA Hub to receive tasks and send back the execution results.

### Connection 2, job containers to RIA Hub instance

The job containers have different network namespaces than the runner, even if they are on the same machine.
They need to connect to RIA Hub to fetch codes if there is `actions/checkout@v4` in the workflow, for example.
Fetching code is not always necessary to run some jobs, but it is required in most cases.

If you use a loopback address to register a runner, the runner can connect to RIA Hub when it is on the same machine.
However, if a job container tries to fetch code from localhost, it will fail because RIA Hub is not in the same container.

### Connection 3, act runner to internet

When you use some actions like `actions/checkout@v4`, the act runner downloads the scripts, not the job containers.
By default, it downloads from [github.com](http://github.com/), so it requires access to the internet. If you configure the `DEFAULT_ACTIONS_URL` to `self`, then it will download from your RIA Hub instance by default. Then it will not connect to internet when downloading the action itself.
It also downloads some docker images from Docker Hub by default, which also requires internet access.

However, internet access is not strictly necessary.
You can configure your RIA Hub instance to fetch actions or images from your intranet facilities.

In fact, your RIA Hub instance can serve as both the actions marketplace and the image registry.
You can mirror actions repositories from GitHub to your RIA Hub instance, and use them as normal.
And [RIA Hub Container Registry](usage/packages/container.md) can be used as a Docker image registry.

### Connection 4, job containers to internet

When using actions such as `actions/setup-go@v5`, it may be necessary to download resources from the internet to set up the Go language environment in job containers.
Therefore, access to the internet is required for the successful completion of these actions.

However, it is optional as well.
You can use your own custom actions to avoid relying on internet access, or you can use your packaged Docker image to run jobs with all dependencies installed.

## Summary

Using RIA Hub Actions only requires ensuring that the runner can connect to the RIA Hub instance.
Internet access is optional, but not having it will require some additional work.
In other words: The runner works best when it can query the internet itself, but you don't need to expose it to the internet (in either direction).

If you encounter any network issues while using RIA Hub Actions, hopefully the image above can help you troubleshoot them.
