# Description

Ensure `TLS version` on `MySQL flexible` servers is set to use TLS version 1.2 or higher.

## Rationale

TLS connectivity helps to provide a new layer of security by connecting database server to client applications using Transport Layer Security (TLS). Enforcing TLS connections between database server and client applications helps protect against "man in the middle" attacks by encrypting the data stream between the server and application.

## Audit

### From Azure Portal

1. Login to Azure Portal using <https://portal.azure.com>.
2. Go to `Azure Database for MySQL flexible servers`.
3. For each database, click on `Server parameters` under `Settings`.
4. In the search box, type in `tls_version`.
5. Ensure `tls_version` is set to `TLSV1.2` (or higher).

### From Azure CLI

Ensure the output of the below command contains the key value pair `values`: `TLSV1.2` (or higher):

```sh
az mysql flexible-server parameter show --name tls_version --resource-group <resourceGroupName> --server-name <serverName>
```

Example output:

```sh
"allowedValues": "TLSv1,TLSv1.1,TLSv1.2", 
"dataType": "Set", 
"defaultValue": "TLSv1.2", 
"description": "Which protocols the server permits for encrypted connections. By default, TLS 1.2 is enforced",
"id": "/subscriptions/<subscriptionId>/resourceGroups/<resourceGroupName>/providers/Microsoft.DBforMySQL/flexibleServers/<serverName>/configurations/tls_version", 
"isConfigPendingRestart": "False", 
"isDynamicConfig": "False", 
"isReadOnly": "False", 
"name": "tls_version", 
"resourceGroup": "<resourceGroupName>", 
"source": "system-default", 
"systemData": null, 
"type": "Microsoft.DBforMySQL/flexibleServers/configurations", 
"value": "TLSv1.2"
```

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [49e6f04d-fbc3-4ac3-9e84-6ae0eb5db024](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F49e6f04d-fbc3-4ac3-9e84-6ae0eb5db024) - **Name**: `Require Secure Transport should be enabled for MySQL flexible servers`

## Default Value

By default, TLS is set to v1.2 for MySQL Flexible servers.

## References

1. <https://docs.microsoft.com/en-us/azure/mysql/concepts-ssl-connection-security>
2. <https://docs.microsoft.com/en-us/azure/mysql/howto-configure-ssl>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-data-protection#dp-4-enable-data-at-rest-encryption-by-default>
