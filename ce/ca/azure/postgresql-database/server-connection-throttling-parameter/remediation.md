# Remediation

## From Azure Portal

1. Login to Azure Portal using <https://portal.azure.com>.
2. Go to `Azure Database for PostgreSQL servers`.
3. For each database, click on `Server parameters`.
4. Search for `connection_throttling`.
5. Click `ON` and `save`.

## From Azure CLI

Use the below command to update `connection_throttling` configuration:

```sh
az postgres server configuration set --resource-group <resourceGroupName> --server-name <serverName> --name connection_throttling --value on
```

## From PowerShell

Use the below command to update `connection_throttling` configuration:

```ps
Update-AzPostgreSqlConfiguration -ResourceGroupName <ResourceGroupName> -ServerName <ServerName> -Name connection_throttling -Value on
```
