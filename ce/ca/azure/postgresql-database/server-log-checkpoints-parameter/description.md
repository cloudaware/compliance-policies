# Description

Enable `log_checkpoints` on `PostgreSQL Servers`.

## Rationale

Enabling `log_checkpoints` helps the PostgreSQL Database to `Log each checkpoint` in turn generates query and error logs. However, access to transaction logs is not supported. Query and error logs can be used to identify, troubleshoot, and repair configuration errors and sub-optimal performance.

## Audit

### From Azure Portal

1. From Azure Home select the Portal Menu.
2. Go to `Azure Database for PostgreSQL servers`.
3. For each database, click on `Server parameters`.
4. Search for `log_checkpoints`.
5. Ensure that value is set to `ON`.

### From Azure CLI

Ensure value is set to `ON`:

```sh
az postgres server configuration show --resource-group <resourceGroupName> --server-name <serverName> --name log_checkpoints
```

### From PowerShell

Ensure value is set to `ON`:

```ps
Get-AzPostgreSqlConfiguration -ResourceGroupName <ResourceGroupName> -ServerName <ServerName> -Name log_checkpoints
```

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [eb6f77b9-bd53-4e35-a23d-7f65d5f0e43d](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Feb6f77b9-bd53-4e35-a23d-7f65d5f0e43d) - **Name**: `Log checkpoints should be enabled for PostgreSQL database servers`

## Default Value

By default `log_checkpoints` is enabled (set to `on`).

## References

1. <https://docs.microsoft.com/en-us/rest/api/postgresql/singleserver/configurations/list-by-server>
2. <https://docs.microsoft.com/en-us/azure/postgresql/howto-configure-server-parameters-using-portal>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-3-enable-logging-for-security-investigation>
4. <https://learn.microsoft.com/en-us/azure/postgresql/single-server/concepts-server-logs#configure-logging>
5. <https://learn.microsoft.com/en-us/powershell/module/az.postgresql/get-azpostgresqlconfiguration?view=azps-9.2.0#example-2-get-specified-postgresql-configuration-by-name>
6. <https://learn.microsoft.com/en-us/powershell/module/az.postgresql/update-azpostgresqlconfiguration?view=azps-9.2.0#example-1-update-postgresql-configuration-by-name>
