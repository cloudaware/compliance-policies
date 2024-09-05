# Description

Enable `log_disconnections` on `PostgreSQL Servers`.

## Rationale

Enabling `log_disconnections` helps PostgreSQL Database to `Logs end of a session`, including duration, which in turn generates query and error logs. Query and error logs can be used to identify, troubleshoot, and repair configuration errors and sub-optimal performance.

## Impact

Enabling this setting will enable a log of all disconnections. If this is enabled for a high traffic server, the log may grow exponentially.

## Audit

### From Azure Portal

1. From Azure Home select the Portal Menu.
2. Go to `Azure Database` for `PostgreSQL servers`.
3. For each database, click on `Server parameters`.
4. Search for `log_disconnections`.
5. Ensure that value is set to ON.

### From Azure CLI

Ensure `log_disconnections` value is set to `ON`:

```sh
az postgres server configuration show --resource-group <resourceGroupName> --server-name <serverName> --name log_disconnections
```

### From PowerShell

Ensure `log_disconnections` value is set to `ON`:

```ps
Get-AzPostgreSqlConfiguration -ResourceGroupName <ResourceGroupName> -ServerName <ServerName> -Name log_disconnections
```

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [eb6f77b9-bd53-4e35-a23d-7f65d5f0e446](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Feb6f77b9-bd53-4e35-a23d-7f65d5f0e446) - **Name**: `Disconnections should be logged for PostgreSQL database servers`

## Default Value

By default `log_disconnections` is disabled (set to `off`).

## References

1. <https://docs.microsoft.com/en-us/rest/api/postgresql/singleserver/configurations/list-by-server>
2. <https://docs.microsoft.com/en-us/azure/postgresql/howto-configure-server-parameters-using-portal>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-3-enable-logging-for-security-investigation>
4. <https://learn.microsoft.com/en-us/powershell/module/az.postgresql/get-azpostgresqlconfiguration?view=azps-9.2.0#example-2-get-specified-postgresql-configuration-by-name>
5. <https://learn.microsoft.com/en-us/powershell/module/az.postgresql/update-azpostgresqlconfiguration?view=azps-9.2.0#example-1-update-postgresql-configuration-by-name>
