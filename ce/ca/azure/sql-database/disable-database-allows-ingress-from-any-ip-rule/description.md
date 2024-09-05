# Description

Ensure that no SQL Databases allow ingress from 0.0.0.0/0 (ANY IP).

## Rationale

Azure SQL Server includes a firewall to block access to unauthorized connections. More granular IP addresses can be defined by referencing the range of addresses available from specific datacenters.

By default, for a SQL server, a Firewall exists with StartIp of 0.0.0.0 and EndIP of 0.0.0.0 allowing access to all the Azure services.

Additionally, a custom rule can be set up with StartIp of 0.0.0.0 and EndIP of 255.255.255.255 allowing access from ANY IP over the Internet.

In order to reduce the potential attack surface for a SQL server, firewall rules should be defined with more granular IP addresses by referencing the range of addresses available from specific datacenters.

## Impact

Disabling `Allow Azure services and resources to access this server` will break all connections to SQL server and Hosted Databases unless custom IP specific rules are added in Firewall Policy.

## Audit

### From Azure Portal

1. Go to `SQL servers`.
2. For each SQL server.
3. Click on `Networking`.
4. Ensure that `Allow Azure services and resources to access this server` is `Unchecked`.
5. Ensure that no firewall rule exists with:
    - Start IP of `0.0.0.0`.
    - or other combinations which allows access to wider public IP ranges.

### From Azure CLI

List all SQL servers:

```sh
az sql server list
```

For each SQL server run the following command:

```sh
az sql server firewall-rule list --resource-group <resource group name> --server <sql server name>
```

Ensure the output does not contain any firewall `allow` rules with a source of `0.0.0.0`, or any rules named `AllowAllWindowsAzureIps`.

### From PowerShell

Get the list of all SQL Servers:

```ps
Get-AzSqlServer
```

For each Server:

```ps
Get-AzSqlServerFirewallRule -ResourceGroupName <resource group name> -ServerName <server name>
```

Ensure that `StartIpAddress` is not set to `0.0.0.0`, `/0` or other combinations which allows access to wider public IP ranges including Windows Azure IP ranges. Also ensure that `FirewallRuleName` doesn't contain `AllowAllWindowsAzureIps` which is the rule created when the `Allow Azure services and resources to access this server` setting is enabled for that SQL Server.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [1b8ca024-1d5c-4dec-8995-b1a932b41780](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F1b8ca024-1d5c-4dec-8995-b1a932b41780) - **Name**: `Public network access on Azure SQL Database should be disabled`

## Default Value

By default, `Allow access to Azure Services is set` to `NO`.

## References

1. <https://docs.microsoft.com/en-us/sql/database-engine/configure-windows/configure-a-windows-firewall-for-database-engine-access?view=sql-server-2017>
2. <https://docs.microsoft.com/en-us/powershell/module/azurerm.sql/get-azurermsqlserverfirewallrule?view=azurermps-5.2.0>
3. <https://docs.microsoft.com/en-us/powershell/module/azurerm.sql/set-azurermsqlserverfirewallrule?view=azurermps-5.2.0>
4. <https://docs.microsoft.com/en-us/powershell/module/azurerm.sql/remove-azurermsqlserverfirewallrule?view=azurermps-5.2.0>
5. <https://docs.microsoft.com/en-us/azure/sql-database/sql-database-firewall-configure>
6. <https://docs.microsoft.com/en-us/sql/relational-databases/system-stored-procedures/sp-set-database-firewall-rule-azure-sql-database?view=azuresqldb-current>
7. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-network-security#ns-2-secure-cloud-native-services-with-network-controls>

## Additional Information

Firewall rules configured on individual SQL Database using Transact-sql overrides the rules set on SQL server. Azure does not provide any Powershell, API, CLI, Portal option to check database level firewall rules, and so far Transact-SQL is the only way to check for the same. For comprehensive control over egress traffic on SQL Databases, Firewall rules should be checked using SQL client.
