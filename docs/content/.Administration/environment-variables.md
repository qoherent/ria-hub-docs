---
date: "2017-04-08T11:34:00+02:00"
title: "Environment variables"
slug: "environment-variables"
sidebar_position: 10
toc: false
draft: false
aliases:
  - /en-us/environment-variables
menu:
  sidebar:
    parent: "administration"
    name: "Environment variables"
    sidebar_position: 10
    identifier: "environment-variables"
---

# Environment variables

This is an inventory of RIA Hub environment variables. They change RIA Hub behaviour.

Initialize them before RIA Hub command to be effective, for example:

```sh
GITEA_CUSTOM=/home/gitea/custom ./gitea web
```

## From Go language

As RIA Hub is written in Go, it uses some variables that influence the behaviour of Go's runtime, such as:

- `GOMEMLIMIT`
- `GOGC`
- `GOMAXPROCS`
- `GODEBUG`

For documentation about each of the variables available, refer to the
[official Go documentation on runtime environment variables](https://pkg.go.dev/runtime#hdr-Environment_Variables).

## RIA Hub files

- `GITEA_WORK_DIR`: Absolute path of working directory.
- `GITEA_CUSTOM`: RIA Hub uses `WorkPath`/custom folder by default. Use this variable to change _custom_ directory.

## Operating system specifics

- `USER`: System user that RIA Hub will run as. Used for some repository access strings.
- `USERNAME`: if no `USER` found, RIA Hub will use `USERNAME`
- `HOME`: User home directory path. The `USERPROFILE` environment variable is used in Windows.

### Only on Windows

- `USERPROFILE`: User home directory path. If empty, uses `HOMEDRIVE` + `HOMEPATH`
- `HOMEDRIVE`: Main drive path used to access the home directory (C:)
- `HOMEPATH`: Home relative path in the given home drive path

## Miscellaneous

- `SKIP_MINWINSVC`: If set to 1, do not run as a service on Windows.
