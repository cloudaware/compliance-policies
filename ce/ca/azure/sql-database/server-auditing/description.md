# Description

Enable auditing on SQL Servers.

## Rationale

The Azure platform allows a SQL server to be created as a service. Enabling auditing at the server level ensures that all existing and newly created databases on the SQL server instance are audited. Auditing policy applied on the SQL database does not override auditing policy and settings applied on the particular SQL server where the database is hosted.

Auditing tracks database events and writes them to an audit log in the Azure storage account. It also helps to maintain regulatory compliance, understand database activity, and gain insight into discrepancies and anomalies that could indicate business concerns or suspected security violations.

## Audit

### From Azure Portal

1. Go to `SQL servers`.
2. For each server instance.
3. Under `Security`, click `Auditing`.
4. Ensure that `Enable Azure SQL Auditing` is set to `On`.

### From PowerShell

Get the list of all SQL Servers:

```ps
Get-AzSqlServer
```

For each Server:

```ps
Get-AzSqlServerAudit -ResourceGroupName <ResourceGroupName> -ServerName <SQLServerName>
```

Ensure that `BlobStorageTargetState`, `EventHubTargetState`, or `LogAnalyticsTargetState` is set to `Enabled`.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [a6fb4358-5bf4-4ad7-ba82-2cd2f41ce5e9](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Fa6fb4358-5bf4-4ad7-ba82-2cd2f41ce5e9) - **Name**: `Auditing on SQL server should be enabled`

## Default Value

By default, `Enable Azure SQL Auditing` is set to `Off`.

## References

1. <https://docs.microsoft.com/en-us/azure/security-center/security-center-enable-auditing-on-sql-servers>
2. <https://docs.microsoft.com/en-us/powershell/module/azurerm.sql/get-azurermsqlserverauditing?view=azurermps-5.2.0>
3. <https://docs.microsoft.com/en-us/powershell/module/azurerm.sql/set-azurermsqlserverauditingpolicy?view=azurermps-5.2.0>
4. <https://docs.microsoft.com/en-us/azure/sql-database/sql-database-auditing>
5. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-3-enable-logging-for-security-investigation>

## Additional Information

- A server policy applies to all existing and newly created databases on the server.
- If server blob auditing is enabled, it always applies to the database. The database will be audited, regardless of the database auditing settings. Auditing type table is already deprecated leaving only type blob available.
- Enabling blob auditing on the database, in addition to enabling it on the server, does not override or change any of the settings of the server blob auditing. Both audits will exist side by side. In other words, the database is audited twice in parallel; once by the server policy and once by the database policy.
