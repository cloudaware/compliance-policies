# Description

Enable `require_secure_transport` on `MySQL flexible servers`.

## Rationale

SSL connectivity provides an additional layer of security by connecting the database server to client applications using Secure Sockets Layer (SSL). Enforcing SSL connections between the database server and client applications helps protect against "man in the middle" attacks by encrypting the data stream between the server and application.

## Audit

### From Azure Portal

1. Log in to Azure Portal using <https://portal.azure.com>.
2. Go to `Azure Database for MySQL flexible servers`.
3. For each database, under `Settings`, click `Server parameters`.
4. In the filter bar, type `require_secure_transport`.
5. Ensure that the `VALUE` for `require_secure_transport` is `ON`.

### From Azure CLI

Ensure the following command returns a `value` of `on`:

```sh
az mysql flexible-server parameter show \
    --resource-group {{resource-group-name}} \
    --server-name {{server-name}} \
    --name require_secure_transport
```

### From PowerShell

Ensure the following command returns a `value` of `on`:

```ps
Get-AzMySqlFlexibleServerConfiguration `
    -ResourceGroupName {{resource-group-name}} `
    -ServerName {{server-name}} `
    -Name require_secure_transport
```

## Default Value

Azure Database for MySQL when provisioned through the Azure portal or CLI will require SSL connections by default.

## References

1. <https://learn.microsoft.com/en-us/azure/mysql/flexible-server/concepts-networking#tls-and-ssl>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-data-protection#dp-3-encrypt-sensitive-data-in-transit>
