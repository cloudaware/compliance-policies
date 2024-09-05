---
title: auth
---
# `auth` subcommand

This subcommand manages access to Cloudaware organizations.

## `auth add`

See more options by executing: 
```shell
java -jar repo-manager.jar auth add --help
```
To add new connection follow section "Get OAuth Token" from [this manual](https://docs.cloudaware.com/DOCS/adding-cloud-accounts-via-cloudaware-api#AddingCloudAccountsviaCloudawareAPI-GetOAuthToken)

Then execute:
```shell
java -jar repo-manager.jar auth add --name=MyOrg --token={token}
```
