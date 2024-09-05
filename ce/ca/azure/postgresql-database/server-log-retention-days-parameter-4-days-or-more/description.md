# Description

Ensure `log_retention_days` on `PostgreSQL Servers` is set to an appropriate value.

## Rationale

Configuring `log_retention_days` determines the duration in days that `Azure Database for PostgreSQL` retains log files. Query and error logs can be used to identify, troubleshoot, and repair configuration errors and sub-optimal performance.

## Impact

Configuring this setting will result in logs being retained for the specified number of days. If this is configured on a high traffic server, the log may grow quickly to occupy a large amount of disk space. In this case you may want to set this to a lower number.

## Audit

### From Azure Portal

1. From Azure Home select the Portal Menu.
2. Go to `Azure Database for PostgreSQL servers`.
3. For each database, click on `Server parameters`.
4. Search for `log_retention_days`.
5. Ensure that the `value` is between 4 and 7 (inclusive).

### From Azure CLI

Ensure `log_retention_days` value is greater than 3:

```sh
az postgres server configuration show --resource-group <resourceGroupName> --server-name <serverName> --name log_retention_days
```

### From Powershell

Ensure `log_retention_days` value is greater than 3:

```ps
Get-AzPostgreSqlConfiguration -ResourceGroupName <ResourceGroupName> -ServerName <ServerName> -Name log_retention_days
```

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [eb6f77b9-bd53-4e35-a23d-7f65d5f0e8f3](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Feb6f77b9-bd53-4e35-a23d-7f65d5f0e8f3) - **Name**: `Log duration should be enabled for PostgreSQL database servers`
- **Policy ID**: [5e1de0e3-42cb-4ebc-a86d-61d0c619ca48](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F5e1de0e3-42cb-4ebc-a86d-61d0c619ca48) - **Name**: `Public network access should be disabled for PostgreSQL flexible servers`

## Default Value

By default `log_retention_days` is set to `3`.

## References

1. <https://docs.microsoft.com/en-us/azure/postgresql/howto-configure-server-parameters-using-portal>
2. <https://docs.microsoft.com/en-us/rest/api/postgresql/singleserver/configurations/list-by-server>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-6-configure-log-storage-retention>
4. <https://learn.microsoft.com/en-us/powershell/module/az.postgresql/get-azpostgresqlconfiguration?view=azps-9.2.0#example-2-get-specified-postgresql-configuration-by-name>
5. <https://learn.microsoft.com/en-us/powershell/module/az.postgresql/update-azpostgresqlconfiguration?view=azps-9.2.0#example-1-update-postgresql-configuration-by-name>
