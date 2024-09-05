# Remediation

## From Azure Portal

1. Login to Azure Portal using <https://portal.azure.com>.
2. Go to `Azure Database for PostgreSQL servers`.
3. For each database, click on `Connection security`.
4. Under `Firewall rules`, set `Allow access to Azure services` to `No`.
5. Click `Save`.

## From Azure CLI

Use the below command to delete the `AllowAllWindowsAzureIps` rule for PostgreSQL Database:

```sh
az postgres server firewall-rule delete --name AllowAllWindowsAzureIps --resource-group <resourceGroupName> --server-name <serverName>
```
