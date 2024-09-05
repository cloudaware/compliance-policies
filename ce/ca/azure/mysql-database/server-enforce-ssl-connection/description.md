# Description

Enable `SSL connection` on `MYSQL` Servers.

## Rationale

SSL connectivity helps to provide a new layer of security by connecting database server to client applications using Secure Sockets Layer (SSL). Enforcing SSL connections between database server and client applications helps protect against "man in the middle" attacks by encrypting the data stream between the server and application.

## Audit

### From Azure Portal

1. Login to Azure Portal using <https://portal.azure.com>.
2. Go to `Azure Database for MySQL servers`.
3. For each database, click on `Connection security`.
4. In SSL settings, ensure `Enforce SSL connection` is set to `ENABLED`.

### From Azure CLI

Ensure the output of the below command returns `ENABLED`:

```sh
az mysql server show --resource-group <resourceGroupName> --name <serverName> --query sslEnforcement
```

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [e802a67a-daf5-4436-9ea6-f6d821dd0c5d](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Fe802a67a-daf5-4436-9ea6-f6d821dd0c5d) - **Name**: `Enforce SSL connection should be enabled for MySQL database servers`

## Default Value

Azure Database for MySQL when provisioned through the Azure portal or CLI will require SSL connections by default.

## References

1. <https://docs.microsoft.com/en-us/azure/mysql/single-server/concepts-ssl-connection-security>
2. <https://docs.microsoft.com/en-us/azure/mysql/single-server/how-to-configure-ssl>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-data-protection#dp-3-encrypt-sensitive-data-in-transit>
