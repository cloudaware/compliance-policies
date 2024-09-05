# Description

Enable `audit_log_enabled` on `MySQL Servers`.

## Rationale

Enabling audit_log_enabled helps MySQL Database to log items such as connection attempts to the server, DDL/DML access, and more. Log data can be used to identify, troubleshoot, and repair configuration errors and suboptimal performance.

## Impact

There are further costs incurred for storage of logs. For high traffic databases these logs will be significant. Determine your organization's needs before enabling.

## Audit

### From Azure Portal

1. Login to Azure Portal using <https://portal.azure.com>.
2. Select `Azure Database for MySQL Servers`.
3. For each database, under the Settings section in the sidebar, select `Server parameters`.
4. Ensure the `audit_log_enabled` parameter is set to `ON`.

## Default Value

`audit_log_enabled` is set to `OFF` by default.

## References

1. <https://docs.microsoft.com/en-us/azure/mysql/single-server/how-to-configure-audit-logs-portal>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-3-enable-logging-for-security-investigation>

## Additional Information

There is also a CLI version: <https://docs.microsoft.com/en-us/azure/mysql/single-server/how-to-configure-audit-logs-cli>

There are numerous settings and event types and it might be helpful to discuss which of these may be appropriate to have a separate check item for.
