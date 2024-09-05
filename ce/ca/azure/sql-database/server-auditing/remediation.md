# Remediation

## From Azure Portal

1. Go to `SQL servers`.
2. Select the SQL server instance.
3. Under `Security`, click `Auditing`.
4. Click the toggle next to `Enable Azure SQL Auditing`.
5. Select an Audit log destination.
6. Click `Save`.

## From PowerShell

Get the list of all SQL Servers:

```ps
Get-AzSqlServer
```

For each Server, enable auditing and set the retention for at least 90 days.

### Log Analytics Example

```ps
Set-AzSqlServerAudit -ResourceGroupName <resource group name> -ServerName <SQL Server name> -RetentionInDays <Number of Days to retain the audit logs, should be 90days minimum> -LogAnalyticsTargetState Enabled -WorkspaceResourceId "/subscriptions/<subscription ID>/resourceGroups/insights-integration/providers/Microsoft.OperationalInsights/workspaces/<workspace name>
```

### Event Hub Example

```ps
Set-AzSqlServerAudit -ResourceGroupName "<resource group name>" -ServerName "<SQL Server name>" -EventHubTargetState Enabled -EventHubName "<Event Hub name>" -EventHubAuthorizationRuleResourceId "<Event Hub Authorization Rule Resource ID>"
```

### Blob Storage Example

```ps
Set-AzSqlServerAudit -ResourceGroupName "<resource group name>" -ServerName "<SQL Server name>" -BlobStorageTargetState Enabled -StorageAccountResourceId "/subscriptions/<subscription_ID>/resourceGroups/<Resource_Group>/providers/Microsoft.Stora ge/storageAccounts/<Storage Account name>"
```
