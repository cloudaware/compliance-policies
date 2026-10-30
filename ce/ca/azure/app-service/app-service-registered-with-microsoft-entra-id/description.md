# Description

Managed identity in App Service improves security by eliminating secrets in the app, such as credentials in connection strings. When registering an App Service with Entra ID, the app can connect to other Azure services securely without usernames and passwords.

## Rationale

App Service provides a highly scalable, self-patching web hosting service in Azure. It also provides a managed identity for apps, which is a turnkey solution for securing access to Azure SQL Database and other Azure services.

## Audit

### From Azure Portal

1. In the Azure portal, open the portal menu in the upper left.
2. Go to `App Services`.
3. Select each app.
4. Under the `Settings` section, select `Identity`.
5. Under the `System assigned` pane, ensure `Status` is set to `On`.

### From Azure CLI

To check the Register with Entra ID status for an existing app, run the following command:

```sh
az webapp identity show \
    --resource-group {{resource-group-name}} \
    --name {{app-name}} \
    --query principalId
```

The output should return a unique principal ID.

If the command returns no output, Register with Entra ID is not set.

### From PowerShell

List the web apps:

```ps
Get-AzWebApp
```

For each web app, run the following command:

```ps
Get-AzWebApp `
    -ResourceGroupName {{resource-group-name}} `
    -Name {{app-name}}
```

Make sure the Identity setting contains a unique principal ID.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [0da106f2-4ca3-48e8-bc85-c638fe6aea8f](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F0da106f2-4ca3-48e8-bc85-c638fe6aea8f) - **Name**: `Function apps should use managed identity`
- **Policy ID**: [2b9ad585-36bc-4615-b300-fd4435808332](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F2b9ad585-36bc-4615-b300-fd4435808332) - **Name**: `App Service apps should use managed identity`

## Default Value

By default, managed identity via Entra ID is disabled.

## References

1. <https://docs.microsoft.com/en-gb/azure/app-service/app-service-web-tutorial-connect-msi>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-identity-management#im-1-use-centralized-identity-and-authentication-system>
