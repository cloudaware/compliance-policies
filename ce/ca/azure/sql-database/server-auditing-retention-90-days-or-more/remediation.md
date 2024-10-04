# Remediation

## From Azure Portal

1. Go to `SQL servers`.
2. For each SQL server, under `Security`, click `Auditing`.
3. If `Storage` is checked, expand `Advanced properties`.
4. Set `Retention (days)` to a value greater than `90`, or `0` for unlimited retention.
5. Click `Save`.

## From PowerShell

For each Server, set retention policy to more than 90 days.

### Log Analytics Example

```ps
Set-AzSqlServerAudit -ResourceGroupName <resource group name> -ServerName <SQL Server name> -RetentionInDays <Number of Days to retain the audit logs, should be more than 90 days> -LogAnalyticsTargetState Enabled -WorkspaceResourceId "/subscriptions/<subscription ID>/resourceGroups/insights-integration/providers/Microsoft.OperationalInsights/workspaces/<workspace name>
```

### Event Hub Example

```ps
Set-AzSqlServerAudit -ResourceGroupName "<resource group name>" -ServerName "<SQL Server name>" -EventHubTargetState Enabled -EventHubName "<Event Hub name>" -EventHubAuthorizationRuleResourceId "<Event Hub Authorization Rule Resource ID>"
```

### Blob Storage Example

```ps
Set-AzSqlServerAudit -ResourceGroupName "<resource group name>" -ServerName "<SQL Server name>" -BlobStorageTargetState Enabled -StorageAccountResourceId "/subscriptions/<subscription_ID>/resourceGroups/<Resource_Group>/providers/Microsoft.Stora ge/storageAccounts/<Storage Account name>"
```
