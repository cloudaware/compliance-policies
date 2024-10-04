# Description

Azure App Service Authentication is a feature that can prevent anonymous HTTP requests from reaching a Web Application or authenticate those with tokens before they reach the app. If an anonymous request is received from a browser, App Service will redirect to a logon page. To handle the logon process, a choice from a set of identity providers can be made, or a custom authentication mechanism can be implemented.

## Rationale

By Enabling App Service Authentication, every incoming HTTP request passes through it before being handled by the application code. It also handles authentication of users with the specified provider (Entra ID, Facebook, Google, Microsoft Account, and Twitter), validation, storing and refreshing of tokens, managing the authenticated sessions and injecting identity information into request headers. Disabling HTTP Basic Authentication functionality further ensures legacy authentication methods are disabled within the application.

## Impact

This is only required for App Services which require authentication. Enabling on site like a marketing or support website will prevent unauthenticated access which would be undesirable.

Adding Authentication requirement will increase cost of App Service and require additional security components to facilitate the authentication.

## Audit

### From Azure Portal

1. Login to Azure Portal using <https://portal.azure.com>.
2. Go to `App Services`.
3. Click on each App.
4. Under `Settings` section, Click on `Authentication`.
5. Ensure that `App Service authentication` set to `Enabled` (Will only appear once an Identity provider is set up/selected).
6. Navigate back to the application blade.
7. Under `Settings`, click on `Configuration`.
8. Click on the `General Settings` tab.
9. Under `Platform settings`, ensure `Basic Auth Publishing Credentials` is set to `Off`.

### From Azure CLI

To check App Service Authentication status for an existing app, run the following command (using `authV1` extension):

```sh
az webapp auth show --resource-group <RESOURCE_GROUP_NAME> --name <APP_NAME> --query enabled
```

The output should return `true` if App Service authentication is set to `On`.

If using the `authV2` extension for the `az webapp auth` CLI, run the following command:

```sh
az webapp auth show --resource-group <RESOURCE_GROUP_NAME> --name <APP_NAME>
```

Ensure that the `enabled` setting under `azureActiveDirectory` is set to `true`.

To check whether the `Basic Auth Publishing Credentials` are disabled, issue the following commands:

```sh
az resource show --resource-group <RESOURCE GROUP NAME> --name scm --namespace Microsoft.Web --resource-type basicPublishingCredentialsPolicies --parent sites/<APPLICATION NAME>
```

```sh
az resource show --resource-group <RESOURCE GROUP NAME> --name ftp --namespace Microsoft.Web --resource-type basicPublishingCredentialsPolicies --parent sites/<APPLICATION NAME>
```

Ensure `allow` is set to `false` under `properties` within the output of each of the above commands.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [c75248c1-ea1d-4a9c-8fc9-29a6aabd5da8](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Fc75248c1-ea1d-4a9c-8fc9-29a6aabd5da8) - **Name**: `Function apps should have authentication enabled`
- **Policy ID**: [95bccee9-a7f8-4bec-9ee9-62c3473701fc](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F95bccee9-a7f8-4bec-9ee9-62c3473701fc) - **Name**: `App Service apps should have authentication enabled`

## Default Value

By default, App Service Authentication is disabled when a new app is created using the command-line tool or Azure Portal console.

## References

1. <https://docs.microsoft.com/en-us/azure/app-service/app-service-authentication-overview>
2. <https://docs.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#website-contributor>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-privileged-access#pa-3-manage-lifecycle-of-identities-and-entitlements>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-governance-strategy#gs-6-define-and-implement-identity-and-privileged-access-strategy>

## Additional Information

You're not required to use App Service for authentication and authorization. Many web frameworks are bundled with security features, and you can use them if you like. If you need more flexibility than App Service provides, you can also write your own utilities. Secure authentication and authorization require deep understanding of security, including federation, encryption, JSON web tokens (JWT) management, grant types, and so on.
