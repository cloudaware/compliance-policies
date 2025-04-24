# Description

Ensure `logfiles.retention_days` on `PostgreSQL flexible servers` is set to an appropriate value.

## Rationale

Configuring `logfiles.retention_days` determines the duration in days that `Azure Database for PostgreSQL` retains log files. Query and error logs can be used to identify, troubleshoot, and repair configuration errors and sub-optimal performance.

## Impact

Configuring this setting will result in logs being retained for the specified number of days. If this is configured on a high traffic server, the log may grow quickly to occupy a large amount of disk space. In this case you may want to set this to a lower number.

## Audit

### From Azure Portal

1. From Azure Home select the Portal Menu.
2. Go to `Azure Database for PostgreSQL flexible servers`.
3. For each database, under `Settings`, click `Server parameters`.
4. In the filter bar, type `logfiles.retention_days`.
5. Ensure that the `VALUE` is between 4 and 7 (inclusive).

### From Azure CLI

Ensure `logfiles.retention_days` value is greater than 3:

```sh
az postgres flexible-server parameter show --resource-group <resourceGroup> --server-name <serverName> --name logfiles.retention_days
```

### From Powershell

Ensure `logfiles.retention_days` value is greater than 3:

```ps
Get-AzPostgreSqlFlexibleServerConfiguration -ResourceGroupName <resourceGroup> -ServerName <serverName> -Name logfiles.retention_days
```

## Default Value

By default `logfiles.retention_days` is set to `3`.

## References

1. <https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/how-to-configure-server-parameters-using-portal>
2. <https://learn.microsoft.com/en-us/rest/api/postgresql/flexibleserver/configurations/list-by-server>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-6-configure-log-storage-retention>
4. <https://learn.microsoft.com/en-us/powershell/module/az.postgresql/get-azpostgresqlflexibleserverconfiguration?view=azps-12.2.0#example-1-get-specified-postgresql-configuration-by-name>
5. <https://learn.microsoft.com/en-us/powershell/module/az.postgresql/update-azpostgresqlflexibleserverconfiguration?view=azps-12.2.0#example-1-updatae-specified-postgresql-configuration-by-name>
