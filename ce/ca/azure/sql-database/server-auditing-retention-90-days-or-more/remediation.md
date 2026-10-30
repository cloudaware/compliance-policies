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
