# Remediation

## From Azure Portal

### Part 1 - Turn on audit logs

1. Login to Azure Portal using <https://portal.azure.com>.
2. Go to `Azure Database for MySQL flexible servers`.
3. For each database, under `Settings`, click `Server parameters`.
4. Set `audit_log_enabled` to `ON`.
5. Click `Save`.

### Part 2 - Capture audit logs (diagnostic settings is for example only, send these logs to the appropriate data sink for your logging needs)

1. Under Monitoring, select `Diagnostic settings`.
2. Select `+ Add diagnostic setting`.
3. Provide a diagnostic setting name.
4. Under Categories, select `MySQL Audit Logs`.
5. Specify destination details.
6. Click `Save`.

It may take up to 10 minutes for the logs to appear in the configured destination.

## From Azure CLI

Use the below command to enable audit_log_enabled:

```sh
az mysql flexible-server parameter set --resource-group <resourceGroup> --server-name <serverName> --name audit_log_enabled --value on
```

## From PowerShell

Use the below command to enable audit_log_enabled:

```ps
Update-AzMySqlFlexibleServerConfiguration -ResourceGroupName <resourceGroup> -ServerName <serverName> -Name audit_log_enabled -Value on
```
