# Description

Enable `connection_throttling` on `PostgreSQL Servers`.

## Rationale

Enabling `connection_throttling` helps the PostgreSQL Database to `Set the verbosity of logged messages`. This in turn generates query and error logs with respect to concurrent connections that could lead to a successful Denial of Service (DoS) attack by exhausting connection resources. A system can also fail or be degraded by an overload of legitimate users. Query and error logs can be used to identify, troubleshoot, and repair configuration errors and sub-optimal performance.

## Audit

### From Azure Portal

1. Login to Azure Portal using <https://portal.azure.com>.
2. Go to `Azure Database for PostgreSQL servers`.
3. For each database, click on `Server parameters`.
4. Search for `connection_throttling`.
5. Ensure that value is set to `ON`.

### From Azure CLI

Ensure `connection_throttling` value is set to `ON`:

```sh
az postgres server configuration show --resource-group <resourceGroupName> --server-name <serverName> --name connection_throttling
```

### From PowerShell

Ensure `connection_throttling` value is set to `ON`:

```ps
Get-AzPostgreSqlConfiguration -ResourceGroupName <ResourceGroupName> -ServerName <ServerName> -Name connection_throttling
```

## From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [5345bb39-67dc-4960-a1bf-427e16b9a0bd](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F5345bb39-67dc-4960-a1bf-427e16b9a0bd) - **Name**: `Connection throttling should be enabled for PostgreSQL database servers`

## Default Value

By default, `connection_throttling` is enabled (set to `on`).

## References

1. <https://docs.microsoft.com/en-us/rest/api/postgresql/singleserver/configurations/list-by-server>
2. <https://docs.microsoft.com/en-us/azure/postgresql/howto-configure-server-parameters-using-portal>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-3-enable-logging-for-security-investigation>
4. <https://learn.microsoft.com/en-us/powershell/module/az.postgresql/get-azpostgresqlconfiguration?view=azps-9.2.0#example-2-get-specified-postgresql-configuration-by-name>
5. <https://learn.microsoft.com/en-us/powershell/module/az.postgresql/update-azpostgresqlconfiguration?view=azps-9.2.0#example-1-update-postgresql-configuration-by-name>
