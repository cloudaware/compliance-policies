# Description

Azure App Service Authentication is a feature that can prevent anonymous HTTP requests from reaching a web application or authenticate those requests with tokens before they reach the app. If an anonymous request is received from a browser, App Service redirects to a login page. To handle the login process, you can choose from a set of identity providers or implement a custom authentication mechanism.

## Rationale

By enabling App Service Authentication, every incoming HTTP request passes through it before being handled by the application code. It also handles authentication of users with the specified provider (Entra ID, Facebook, Google, Microsoft Account, and Twitter), validation, storing and refreshing of tokens, managing authenticated sessions, and injecting identity information into request headers. Disabling HTTP Basic Authentication further ensures legacy authentication methods are disabled within the application.

## Impact

This is only required for App Services that require authentication. Enabling it on a site like a marketing or support website will prevent unauthenticated access, which may be undesirable.

Adding an authentication requirement can increase App Service costs and require additional security components to facilitate authentication.

## Audit

### From Azure Portal

1. Log in to the Azure portal using <https://portal.azure.com>.
2. Go to `App Services`.
3. Select each app.
4. Under `Settings`, select `Authentication`.
5. Ensure `App Service authentication` is set to `Enabled` (this appears only after an identity provider is set up).
6. Navigate back to the application blade.
7. Under `Settings`, select `Configuration`.
8. Select the `General Settings` tab.
9. Under `Platform settings`, ensure `Basic Auth Publishing Credentials` is set to `Off`.

### From Azure CLI

To check App Service Authentication status for an existing app, run the following command (using `authV1` extension):

```sh
az webapp auth show \
    --resource-group {{resource-group-name}} \
    --name {{app-name}} \
    --query enabled
```

The output should return `true` if App Service authentication is set to `On`.

If using the `authV2` extension for the `az webapp auth` CLI, run the following command:

```sh
az webapp auth show \
    --resource-group {{resource-group-name}} \
    --name {{app-name}}
```

Ensure that the `enabled` setting under `azureActiveDirectory` is set to `true`.

To check whether the `Basic Auth Publishing Credentials` are disabled, issue the following commands:

```sh
az resource show \
    --resource-group {{resource-group-name}} \
    --name scm \
    --namespace Microsoft.Web \
    --resource-type basicPublishingCredentialsPolicies \
    --parent sites/{{application-name}}
```

```sh
az resource show \
    --resource-group {{resource-group-name}} \
    --name ftp \
    --namespace Microsoft.Web \
    --resource-type basicPublishingCredentialsPolicies \
    --parent sites/{{application-name}}
```

Ensure `allow` is set to `false` under `properties` within the output of each of the above commands.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [c75248c1-ea1d-4a9c-8fc9-29a6aabd5da8](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Fc75248c1-ea1d-4a9c-8fc9-29a6aabd5da8) - **Name**: `Function apps should have authentication enabled`
- **Policy ID**: [95bccee9-a7f8-4bec-9ee9-62c3473701fc](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F95bccee9-a7f8-4bec-9ee9-62c3473701fc) - **Name**: `App Service apps should have authentication enabled`

## Default Value

By default, App Service Authentication is disabled when a new app is created using the command-line tool or the Azure portal.

## References

1. <https://docs.microsoft.com/en-us/azure/app-service/app-service-authentication-overview>
2. <https://docs.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#website-contributor>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-privileged-access#pa-3-manage-lifecycle-of-identities-and-entitlements>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-governance-strategy#gs-6-define-and-implement-identity-and-privileged-access-strategy>

## Additional Information

You are not required to use App Service for authentication and authorization. Many web frameworks are bundled with security features that you can use. If you need more flexibility than App Service provides, you can also write your own utilities. Secure authentication and authorization require deep understanding of security, including federation, encryption, JSON web tokens (JWT) management, grant types, and more.
