# Description

Set `audit_log_enabled` to include `CONNECTION` on `MySQL Servers`.

## Rationale

Enabling `CONNECTION` helps MySQL Database to log items such as successful and failed connection attempts to the server. Log data can be used to identify, troubleshoot, and repair configuration errors and suboptimal performance.

## Impact

There are further costs incurred for storage of logs. For high traffic databases these logs will be significant. Determine your organization's needs before enabling.

## Audit

### From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Azure Database for MySQL servers`.
3. Select a database.
4. Under `Settings`, select `Server parameters`.
5. Ensure `audit_log_enabled` parameter is set to `ON`.
6. Ensure `audit_log_events` parameter has `CONNECTION` checked.

## Default Value

By default `audit_log_events` is `disabled`.

## References

1. <https://docs.microsoft.com/en-us/azure/mysql/single-server/how-to-configure-audit-logs-portal>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-3-enable-logging-for-security-investigation>

## Additional Information

There is also a CLI version: <https://docs.microsoft.com/en-us/azure/mysql/single-server/how-to-configure-audit-logs-cli>
