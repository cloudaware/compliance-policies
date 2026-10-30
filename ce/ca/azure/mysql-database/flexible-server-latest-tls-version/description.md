# Description

Ensure `tls_version` on `MySQL flexible servers` is set to TLS version 1.2 or higher.

## Rationale

TLS connectivity provides an additional layer of security by connecting the database server to client applications using Transport Layer Security (TLS). Enforcing TLS connections between the database server and client applications helps protect against "man in the middle" attacks by encrypting the data stream between the server and application.

## Audit

### From Azure Portal

1. Log in to Azure Portal using <https://portal.azure.com>.
2. Go to `Azure Database for MySQL flexible servers`.
3. For each database, under `Settings`, click `Server parameters`.
4. In the filter bar, type `tls_version`.
5. Ensure `tls_version` is set to `TLSv1.2` (or higher).

### From Azure CLI

Ensure the value of the following command contains `TLSv1.2` or higher, and does not contain anything lower than `TLSv1.2`:

```sh
az mysql flexible-server parameter show \
    --resource-group {{resource-group-name}} \
    --server-name {{server-name}} \
    --name tls_version
```

Example output:

```json
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

### From PowerShell

Ensure the `Value` of the following command contains `TLSv1.2` or higher, and does not contain anything lower than `TLSv1.2`:

```ps
Get-AzMySqlFlexibleServerConfiguration `
    -ResourceGroupName {{resource-group-name}} `
    -ServerName {{server-name}} `
    -Name tls_version
```

## Default Value

By default, TLS is set to v1.2 for MySQL flexible servers.

## References

1. <https://learn.microsoft.com/en-us/azure/mysql/flexible-server/concepts-networking#tls-and-ssl>
2. <https://learn.microsoft.com/en-us/azure/mysql/flexible-server/how-to-connect-tls-ssl>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-data-protection#dp-3-encrypt-sensitive-data-in-transit>
