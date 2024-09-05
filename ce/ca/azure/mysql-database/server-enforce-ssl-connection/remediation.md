# Remediation

## From Azure Portal

1. Login to Azure Portal using <https://portal.azure.com>.
2. Go to `Azure Database for MySQL servers`.
3. For each database, click on `Connection security`.
4. In `SSL` settings, click on `ENABLED` to `Enforce SSL connections`.

## From Azure CLI

Use the below command to set MYSQL Databases to `Enforce SSL connection`:

```sh
az mysql server update --resource-group <resourceGroupName> --name <serverName> --ssl-enforcement Enabled
```
