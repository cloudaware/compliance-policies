# Description

Enable `log_checkpoints` on `PostgreSQL flexible servers`.

## Rationale

Enabling `log_checkpoints` helps the PostgreSQL Database to `Log each checkpoint`, which in turn generates query and error logs. However, access to transaction logs is not supported. Query and error logs can be used to identify, troubleshoot, and repair configuration errors and sub-optimal performance.

## Audit

### From Azure Portal

1. From Azure Home select the Portal Menu.
2. Go to `Azure Database for PostgreSQL flexible servers`.
3. For each database, under `Settings`, click `Server parameters`.
4. In the filter bar, type `log_checkpoints`.
5. Ensure that the `VALUE` for `log_checkpoints` is set to `ON`.

### From Azure CLI

Ensure the below command returns a `value` of `on`:

```sh
az postgres flexible-server parameter show --resource-group <resourceGroup> --server-name <serverName> --name log_checkpoints
```

### From PowerShell

Ensure the below command returns a `value` of `on`:

```ps
Get-AzPostgreSqlFlexibleServerConfiguration -ResourceGroupName <resourceGroup> -ServerName <serverName> -Name log_checkpoints
```

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [70be9e12-c935-49ac-9bd8-fd64b85c1f87](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F70be9e12-c935-49ac-9bd8-fd64b85c1f87) - **Name**: `Log checkpoints should be enabled for PostgreSQL flexible servers`

## Default Value

By default `log_checkpoints` is enabled (set to `on`).

## References

1. <https://learn.microsoft.com/en-us/rest/api/postgresql/flexibleserver/configurations/list-by-server>
2. <https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/how-to-configure-server-parameters-using-portal>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-3-enable-logging-for-security-investigation>
4. <https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/concepts-logging#configure-logging>
5. <https://learn.microsoft.com/en-us/powershell/module/az.postgresql/get-azpostgresqlflexibleserverconfiguration?view=azps-12.2.0#example-1-get-specified-postgresql-configuration-by-name>
6. <https://learn.microsoft.com/en-us/powershell/module/az.postgresql/update-azpostgresqlflexibleserverconfiguration?view=azps-12.2.0#example-1-updatae-specified-postgresql-configuration-by-name>
