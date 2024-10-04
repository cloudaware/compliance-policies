# Description

Enable `SSL connection` on `PostgreSQL` Servers.

## Rationale

`SSL connectivity` helps to provide a new layer of security by connecting database server to client applications using Secure Sockets Layer (SSL). Enforcing SSL connections between database server and client applications helps protect against "man in the middle" attacks by encrypting the data stream between the server and application.

## Audit

### From Azure Portal

1. Login to Azure Portal using <https://portal.azure.com>.
2. Go to `Azure Database for PostgreSQL server`.
3. For each database, click on `Connection security`.
4. In `SSL` settings, ensure `Enforce SSL connection` is set to `ENABLED`.

### From Azure CLI

Ensure the output of the below command returns `Enabled`:

```sh
az postgres server show --resource-group myresourcegroup --name <resourceGroupName> --query sslEnforcement
```

### From PowerShell

Ensure the output of the below command returns Enabled:

```ps
Get-AzPostgreSqlServer -ResourceGroupName <ResourceGroupName > -ServerName <ServerName> | Select-Object SslEnforcement
```

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [d158790f-bfb0-486c-8631-2dc6b4e8e6af](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Fd158790f-bfb0-486c-8631-2dc6b4e8e6af) - **Name**: `Enforce SSL connection should be enabled for PostgreSQL database servers`

## Default Value

By default, secure connectivity is enforced, but some application frameworks may not enable it during deployment.

## References

1. <https://docs.microsoft.com/en-us/azure/postgresql/concepts-ssl-connection-security>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-data-protection#dp-4-enable-data-at-rest-encryption-by-default>
3. <https://learn.microsoft.com/en-us/powershell/module/az.postgresql/get-azpostgresqlserver?view=azps-9.2.0#example-2-get-postgresql-server-by-resource-group-and-server-name>
4. <https://learn.microsoft.com/en-us/powershell/module/az.postgresql/update-azpostgresqlserver?view=azps-9.2.0#example-1-update-postgresql-server-by-resource-group-and-server-name>
