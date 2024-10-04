# Remediation

## From Azure Portal

1. Login to Azure Portal using <https://portal.azure.com>.
2. Go to `Azure Database for MySQL flexible servers`.
3. For each database, under `Settings`, click `Server parameters`.
4. In the filter bar, type `audit_log`.
5. Set `audit_log_enabled` to `ON`.
6. In the drop-down next to `audit_log_events`, check `CONNECTION`.
7. Click `Save`.
8. Under `Monitoring`, select `Diagnostic settings`.
9. Select `+ Add diagnostic setting`.
10. Provide a diagnostic setting name.
11. Under `Categories`, select `MySQL Audit Logs`.
12. Specify destination details.
13. Click `Save`.

It may take up to 10 minutes for the logs to appear in the configured destination.

## From Azure CLI

Use the below command to set `audit_log_events` to `CONNECTION`:

```sh
az mysql flexible-server parameter set --resource-group <resourceGroup> --server-name <serverName> --name audit_log_events --value CONNECTION
```

## From PowerShell

Use the below command to set `audit_log_events` to `CONNECTION`:

```ps
Update-AzMySqlFlexibleServerConfiguration -ResourceGroupName <resourceGroup> -ServerName <serverName> -Name audit_log_events -Value CONNECTION
```
