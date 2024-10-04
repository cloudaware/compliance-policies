# Description

Enable connection throttling on ё.

## Rationale

Enabling `connection_throttling` helps the PostgreSQL Database to `Set the verbosity of logged messages`. This in turn generates query and error logs with respect to concurrent connections that could lead to a successful Denial of Service (DoS) attack by exhausting connection resources. A system can also fail or be degraded by an overload of legitimate users. Query and error logs can be used to identify, troubleshoot, and repair configuration errors and sub-optimal performance.

## Audit

### From Azure Portal

1. Login to Azure Portal using <https://portal.azure.com>.
2. Go to `Azure Database for PostgreSQL flexible servers`.
3. For each database, under Settings, click `Server parameters`.
4. In the filter bar, type `connection_throttle.enable`.
5. Ensure that `VALUE` for `connection_throttle.enable` is set to `ON`.

### From Azure CLI

Ensure the below command returns a `value` of `ON`:

```sh
az postgres flexible-server parameter show --resource-group <resourceGroup> --server-name <serverName> --name connection_throttle.enable
```

### From PowerShell

Ensure the below command returns a `Value` of `ON`:

```ps
Get-AzPostgreSqlFlexibleServerConfiguration -ResourceGroupName <resourceGroup> -ServerName <serverName> -Name connection_throttle.enable
```

## From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [dacf07fa-0eea-4486-80bc-b93fae88ac40](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Fdacf07fa-0eea-4486-80bc-b93fae88ac40) - **Name**: `Connection throttling should be enabled for PostgreSQL flexible servers`

## Default Value

By default, `connection_throttle.enable` is disabled (set to `off`).

## References

1. <https://learn.microsoft.com/en-us/rest/api/postgresql/flexibleserver/configurations/list-by-server>
2. <https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/how-to-configure-server-parameters-using-portal>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-3-enable-logging-for-security-investigation>
4. <https://learn.microsoft.com/en-us/powershell/module/az.postgresql/get-azpostgresqlflexibleserverconfiguration?view=azps-12.2.0#example-1-get-specified-postgresql-configuration-by-name>
5. <https://learn.microsoft.com/en-us/powershell/module/az.postgresql/update-azpostgresqlflexibleserverconfiguration?view=azps-12.2.0#example-1-updatae-specified-postgresql-configuration-by-name>
