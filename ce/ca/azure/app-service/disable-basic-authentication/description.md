# Description

Basic Authentication provides the ability to create identities and authentication for an App Service without a centralized Identity Provider. For a more effective, capable, and secure solution for Identity, Authentication, Authorization, and Accountability, a centralized Identity Provider such as Entra ID is strongly advised.

## Rationale

Basic Authentication introduces an identity silo which can produce privileged access to a resource. This can be exploited in numerous ways and represents a significant vulnerability and attack vector.

## Impact

An Identity Provider that can be used by the App Service for authenticating users is required.

## Audit

### From Azure Portal

1. Search for, and open `App Services` from the search bar.
2. For each App Service listed.
3. Click on the App Service name.
4. Under the `Settings` menu item, click on `Configuration`.
5. Under the `General settings` tab, scroll down to locate the two Basic Auth settings:
    - `SCM Basic Auth Publishing Credentials`.
    - `FTP Basic Auth Publishing Credentials`.

Both radio buttons should indicate a status of `Off`.

Repeat this procedure for each App Service.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [871b205b-57cf-4e1e-a234-492616998bf7](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F871b205b-57cf-4e1e-a234-492616998bf7) - **Name**: `Function apps should have authentication enabled`
- **Policy ID**: [aede300b-d67f-480a-ae26-4b3dfb1a1fdc](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Faede300b-d67f-480a-ae26-4b3dfb1a1fdc) - **Name**: `App Service apps should have authentication enabled`

## Default Value

Both parameters for Basic Authentication (SCM and FTP) are set to `On` by default.

## References

1. <https://learn.microsoft.com/en-us/azure/app-service/configure-basic-auth-disable?tabs=portal>
