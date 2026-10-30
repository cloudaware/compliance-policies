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
Set-AzSqlServerAudit `
    -ResourceGroupName {{resource-group-name}} `
    -ServerName {{sql-server-name}} `
    -RetentionInDays {{retention-days-min-90}} `
    -LogAnalyticsTargetState Enabled `
    -WorkspaceResourceId "/subscriptions/{{subscription-id}}/resourceGroups/{{resource-group-name}}/providers/Microsoft.OperationalInsights/workspaces/{{workspace-name}}"
```

### Event Hub Example

```ps
Set-AzSqlServerAudit `
    -ResourceGroupName "{{resource-group-name}}" `
    -ServerName "{{sql-server-name}}" `
    -EventHubTargetState Enabled `
    -EventHubName "{{event-hub-name}}" `
    -EventHubAuthorizationRuleResourceId "{{event-hub-authorization-rule-resource-id}}"
```

### Blob Storage Example

```ps
Set-AzSqlServerAudit `
    -ResourceGroupName "{{resource-group-name}}" `
    -ServerName "{{sql-server-name}}" `
    -BlobStorageTargetState Enabled `
    -StorageAccountResourceId "/subscriptions/{{subscription-id}}/resourceGroups/{{resource-group-name}}/providers/Microsoft.Storage/storageAccounts/{{storage-account-name}}"
```
