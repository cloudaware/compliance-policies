# Description

Enable `require_secure_transport` on `PostgreSQL flexible servers`.

## Rationale

`SSL connectivity` helps to provide a new layer of security by connecting database server to client applications using Secure Sockets Layer (SSL). Enforcing SSL connections between database server and client applications helps protect against "man in the middle" attacks by encrypting the data stream between the server and application.

## Audit

### From Azure Portal

1. Login to Azure Portal using <https://portal.azure.com>.
2. Go to `Azure Database for PostgreSQL flexible servers`.
3. For each database, under `Settings`, click `Server parameters`.
4. In the filter bar, type `require_secure_transport`.
5. Ensure that the `VALUE` for `require_secure_transport` is set to `ON`.

### From Azure CLI

Ensure the below command returns a `value` of `on`:

```sh
az postgres flexible-server parameter show --resource-group <resourceGroup> --server-name <serverName> --name require_secure_transport
```

### From PowerShell

Ensure the below command returns a `value` of `on`:

```ps
Get-AzPostgreSqlFlexibleServerConfiguration -ResourceGroupName <resourceGroup> -ServerName <serverName> -Name require_secure_transport
```

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [c29c38cb-74a7-4505-9a06-e588ab86620a](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Fc29c38cb-74a7-4505-9a06-e588ab86620a) - **Name**: `Enforce SSL connection should be enabled for PostgreSQL flexible servers`

## Default Value

By default, secure connectivity is enforced, but some application frameworks may not enable it during deployment.

## References

1. <https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/concepts-networking-ssl-tls>
2. <https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/how-to-connect-tls-ssl>
3. <https://learn.microsoft.com/en-us/powershell/module/az.postgresql/get-azpostgresqlflexibleserverconfiguration?view=azps-12.2.0#example-1-get-specified-postgresql-configuration-by-name>
4. <https://learn.microsoft.com/en-us/powershell/module/az.postgresql/update-azpostgresqlflexibleserverconfiguration?view=azps-12.2.0#example-1-updatae-specified-postgresql-configuration-by-name>
5. <https://learn.microsoft.com/en-us/security/benchmark/>
