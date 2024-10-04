# Description

SQL Server Audit Retention should be configured to be greater than 90 days.

## Rationale

Audit Logs can be used to check for anomalies and give insight into suspected breaches or misuse of information and access.

## Audit

### From Azure Portal

1. Go to `SQL servers`.
2. For each SQL server, under `Security`, click `Auditing`.
3. If `Storage` is checked, expand `Advanced properties`.
4. Ensure `Retention (days)` is set to a value greater than `90`, or `0` for unlimited retention.

## From PowerShell

Get the list of all SQL Servers:

```ps
Get-AzSqlServer
```

For each Server:

```ps
Get-AzSqlServerAudit -ResourceGroupName <resource group name> -ServerName <server name>
```

Ensure that `RetentionInDays` is set to `more than 90`.

**Note**: If the SQL server is set with `LogAnalyticsTargetState` setting set to `Enabled`, run the following additional command:

```ps
Get-AzOperationalInsightsWorkspace | Where-Object {$_.ResourceId -eq <SQL Server WorkSpaceResourceId>}
```

Ensure that `RetentionInDays` is set to `more than 90`.

## From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [89099bee-89e0-4b26-a5f4-165451757743](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F89099bee-89e0-4b26-a5f4-165451757743) - **Name**: `SQL servers with auditing to storage account destination should be configured with 90 days retention or higher`

## Default Value

By default, SQL Server audit storage is `disabled`.

## References

1. <https://docs.microsoft.com/en-us/azure/sql-database/sql-database-auditing>
2. <https://docs.microsoft.com/en-us/powershell/module/azurerm.sql/get-azurermsqlserverauditing?view=azurermps-5.2.0>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-6-configure-log-storage-retention>
