# Description

Disable access from Azure services to PostgreSQL Database Server.

## Rationale

If access from Azure services is enabled, the server's firewall will accept connections from all Azure resources, including resources not in your subscription. This is usually not a desired configuration. Instead, set up firewall rules to allow access from specific network ranges or VNET rules to allow access from specific virtual networks.

## Audit

### From Azure Portal

1. Login to Azure Portal using <https://portal.azure.com>.
2. Go to `Azure Database for PostgreSQL servers`.
3. For each database, click on `Connection security`.
4. Under `Firewall rules`, ensure `Allow access to Azure services` is set to `No`.

### From Azure CLI

Ensure the output of the below command does not include a rule with the name `AllowAllWindowsAzureIps` or `startIpAddress`: `0.0.0.0` or `endIpAddress`: `0.0.0.0`:

```sh
az postgres server firewall-rule list --resource-group <resourceGroupName> --server <serverName>
```

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [b52376f7-9612-48a1-81cd-1ffe4b61032c](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Fb52376f7-9612-48a1-81cd-1ffe4b61032c) - **Name**: `Public network access should be disabled for PostgreSQL servers`
- **Policy ID**: [5e1de0e3-42cb-4ebc-a86d-61d0c619ca48](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F5e1de0e3-42cb-4ebc-a86d-61d0c619ca48) - **Name**: `Public network access should be disabled for PostgreSQL flexible servers`

## Default Value

The Azure Postgres firewall is set to block all access by default.

## References

1. <https://docs.microsoft.com/en-us/azure/postgresql/concepts-firewall-rules>
2. <https://docs.microsoft.com/en-us/azure/postgresql/howto-manage-firewall-using-cli>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-network-security#ns-1-establish-network-segmentation-boundaries>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-network-security#ns-6-deploy-web-application-firewall>
