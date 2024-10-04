# Description

Disable access from Azure services to `PostgreSQL flexible server`.

## Rationale

If access from Azure services is enabled, the server's firewall will accept connections from all Azure resources, including resources not in your subscription. This is usually not a desired configuration. Instead, set up firewall rules to allow access from specific network ranges or VNET rules to allow access from specific virtual networks.

## Audit

### From Azure Portal

1. Login to Azure Portal using <https://portal.azure.com>.
2. Go to `Azure Database for PostgreSQL flexible servers`.
3. For each database, under `Settings`, click `Networking`.
4. Under `Firewall rules`, ensure `Allow public access from any Azure service within Azure to this server` is not checked.

### From Azure CLI

Ensure the below command does not return a rule with a name beginning `AllowAllAzureServicesAndResourcesWithinAzureIps` or with `"startIpAddress": "0.0.0.0"` or `"endIpAddress": "0.0.0.0"`:

```sh
az postgres flexible-server firewall-rule list --resource-group <resourceGroup> --name <serverName>
```

### From PowerShell

Ensure the below command does not return a rule with a name beginning `AllowAllAzureServicesAndResourcesWithinAzureIps`:

```ps
Get-AzPostgreSqlFlexibleServerFirewallRule -ResourceGroupName <resourceGroup> -ServerName <serverName>
```

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [5e1de0e3-42cb-4ebc-a86d-61d0c619ca48](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F5e1de0e3-42cb-4ebc-a86d-61d0c619ca48) - **Name**: `Public network access should be disabled for PostgreSQL flexible servers`

## Default Value

The Azure Postgres firewall is set to block all access by default.

## References

1. <https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/concepts-firewall-rules>
2. <https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/how-to-manage-firewall-cli>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-network-security#ns-1-establish-network-segmentation-boundaries>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-network-security#ns-6-deploy-web-application-firewall>
