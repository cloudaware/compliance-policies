# Description

Enable `log_connections` on `PostgreSQL Servers`.

## Rationale

Enabling `log_connections` helps PostgreSQL Database to log attempted connection to the server, as well as successful completion of client authentication. Log data can be used to identify, troubleshoot, and repair configuration errors and suboptimal performance.

## Audit

### From Azure Portal

1. Login to Azure Portal using <https://portal.azure.com>.
2. Go to `Azure Database for PostgreSQL servers`.
3. For each database, click on `Server parameters`.
4. Search for `log_connections`.
5. Ensure that value is set to `ON`.

### From Azure CLI

Ensure `log_connections` value is set to `ON`:

```sh
az postgres server configuration show --resource-group <resourceGroupName> --server-name <serverName> --name log_connections
```

### From PowerShell

Ensure `log_connections` value is set to `ON`:

```ps
Get-AzPostgreSqlConfiguration -ResourceGroupName <ResourceGroupName> -ServerName <ServerName> -Name log_connections
```

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [eb6f77b9-bd53-4e35-a23d-7f65d5f0e442](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Feb6f77b9-bd53-4e35-a23d-7f65d5f0e442) - **Name**: `Log connections should be enabled for PostgreSQL database servers`

## Default Value

By default `log_connections` is enabled (set to `ON`).

## References

1. <https://docs.microsoft.com/en-us/rest/api/postgresql/configurations/listbyserver>
2. <https://docs.microsoft.com/en-us/azure/postgresql/howto-configure-server-parameters-using-portal>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-3-enable-logging-for-security-investigation>
4. <https://learn.microsoft.com/en-us/powershell/module/az.postgresql/get-azpostgresqlconfiguration?view=azps-9.2.0#example-2-get-specified-postgresql-configuration-by-name>
5. <https://learn.microsoft.com/en-us/powershell/module/az.postgresql/update-azpostgresqlconfiguration?view=azps-9.2.0#example-1-update-postgresql-configuration-by-name>
