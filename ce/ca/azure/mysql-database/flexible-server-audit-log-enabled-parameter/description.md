# Description

Enable `audit_log_enabled` on `MySQL flexible servers`.

## Rationale

Enabling `audit_log_enabled` helps MySQL Database to log items such as connection attempts to the server, DDL/DML access, and more. Log data can be used to identify, troubleshoot, and repair configuration errors and suboptimal performance.

## Impact

There are further costs incurred for storage of logs. For high traffic databases these logs will be significant. Determine your organization's needs before enabling.

## Audit

### From Azure Portal

1. Login to Azure Portal using <https://portal.azure.com>.
2. Select `Azure Database for MySQL Servers`.
3. For each database, under the Settings, click `Server parameters`.
4. In the filter bar, type `audit_log_enabled`.
5. Ensure that the `VALUE` for `audit_log_enabled` is `ON`.

### From Azure CLI

Ensure the below command returns a `value` of `on`:

```sh
az mysql flexible-server parameter show --resource-group <resourceGroup> --server-name <serverName> --name audit_log_enabled
```

### From PowerShell

Ensure the below command returns a `value` of `on`:

```ps
Get-AzMySqlFlexibleServerConfiguration -ResourceGroupName <resourceGroup> -ServerName <serverName> -Name audit_log_enabled
```

## Default Value

`audit_log_enabled` is set to `OFF` by default.

## References

1. <https://learn.microsoft.com/en-us/azure/mysql/flexible-server/tutorial-configure-audit>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-3-enable-logging-for-security-investigation>
3. <https://learn.microsoft.com/en-us/azure/mysql/flexible-server/tutorial-configure-audit#configure-auditing-by-using-the-azure-cli>
