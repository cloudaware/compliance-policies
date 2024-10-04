# Description

Set `audit_log_enabled` to include `CONNECTION` on `MySQL flexible servers`.

## Rationale

Enabling `CONNECTION` helps MySQL Database to log items such as successful and failed connection attempts to the server. Log data can be used to identify, troubleshoot, and repair configuration errors and suboptimal performance.

## Impact

There are further costs incurred for storage of logs. For high traffic databases these logs will be significant. Determine your organization's needs before enabling.

## Audit

### From Azure Portal

1. From Azure Home select the Portal Menu.
2. Go to `Azure Database for MySQL flexible servers`.
3. For each database, under `Settings`, click `Server parameters`.
4. In the filter bar, type `audit_log`.
5. Ensure that the `VALUE` for `audit_log_enabled` is `ON`.
6. Ensure that the `VALUE` for `audit_log_events` includes `CONNECTION`.

### From Azure CLI

Ensure the below command returns a `value` that includes `CONNECTION`:

```sh
az mysql flexible-server parameter show --resource-group <resourceGroup> --server-name <serverName> --name audit_log_events
```

### From PowerShell

Ensure the below command returns a `value` that includes `CONNECTION`:

```ps
Get-AzMySqlFlexibleServerConfiguration -ResourceGroupName <resourceGroup> -ServerName <serverName> -Name audit_log_events
```

## Default Value

By default `audit_log_events` is set to `CONNECTION`.

## References

1. <https://learn.microsoft.com/en-us/azure/mysql/flexible-server/concepts-audit-logs>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-3-enable-logging-for-security-investigation>
3. <https://learn.microsoft.com/en-us/azure/mysql/flexible-server/tutorial-configure-audit>
4. <https://learn.microsoft.com/en-us/azure/mysql/flexible-server/tutorial-configure-audit#configure-auditing-by-using-the-azure-cli>
