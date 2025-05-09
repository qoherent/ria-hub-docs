---
date: "2023-01-10T00:00:00+00:00"
title: "Swift Package Registry"
slug: "swift"
sidebar_position: 95
draft: false
toc: false
menu:
  sidebar:
    parent: "packages"
    name: "Swift"
    sidebar_position: 95
    identifier: "swift"
---

# Swift Package Registry

Publish [Swift](https://www.swift.org/) packages for your user or organization.

## Requirements

To work with the Swift package registry, you need to use [swift](https://www.swift.org/getting-started/) to consume and a HTTP client (like `curl`) to publish packages.

## Configuring the package registry

To register the package registry and provide credentials, execute:

```shell
swift package-registry set https://riahub.example.com/api/packages/{owner}/swift
swift package-registry login https://riahub.example.com/api/packages/{owner}/swift --username {username} --password {password}
```

| Placeholder  | Description |
| ------------ | ----------- |
| `owner`      | The owner of the package. |
| `username`   | Your RIA Hub username. |
| `password`   | Your RIA Hub password. If you are using 2FA or OAuth use a [personal access token](development/api-usage.md#authentication) instead of the password. |

The login is optional and only needed if the package registry is private.

## Publish a package

First you have to pack the contents of your package:

```shell
swift package archive-source
```

To publish the package perform a HTTP PUT request with the package content in the request body.

```shell --user your_username:your_password_or_token \
curl -X PUT --user {username}:{password} \
	 -H "Accept: application/vnd.swift.registry.v1+json" \
	 -F source-archive=@/path/to/package.zip \
	 -F metadata={metadata} \
	 https://riahub.example.com/api/packages/{owner}/swift/{scope}/{name}/{version}
```

| Placeholder | Description |
| ----------- | ----------- |
| `username`  | Your RIA Hub username. |
| `password`  | Your RIA Hub password. If you are using 2FA or OAuth use a [personal access token](development/api-usage.md#authentication) instead of the password. |
| `owner`     | The owner of the package. |
| `scope`     | The package scope. |
| `name`      | The package name. |
| `version`   | The package version. |
| `metadata`  | (Optional) The metadata of the package. JSON encoded subset of https://schema.org/SoftwareSourceCode |

You cannot publish a package if a package of the same name and version already exists. You must delete the existing package first.

The server responds with the following HTTP Status codes.

| HTTP Status Code  | Meaning |
| ----------------- | ------- |
| `201 Created`     | The package has been published. |
| `400 Bad Request` | The package is invalid. |
| `409 Conflict`    | A package file with the same combination of parameters exists already. |

## Install a package

To install a Swift package from the package registry, add it in the `Package.swift` file dependencies list:

```
dependencies: [
	.package(id: "{scope}.{name}", from:"{version}")
]
```

| Parameter   | Description |
| ----------- | ----------- |
| `scope`     | The package scope. |
| `name`      | The package name. |
| `version`   | The package version. |

Afterwards execute the following command to install it:

```shell
swift package resolve
```
