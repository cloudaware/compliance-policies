# Remediation

## From Azure Portal

1. Login to Azure Portal using <https://portal.azure.com>.
2. Go to `Azure Database for PostgreSQL servers`.
3. For each database, under `Settings`, click `Server parameters`.
4. In the filter bar, type `log_connections`.
5. Set `log_connections` to `ON`.
6. Click `Save`.

## From Azure CLI

Use the below command to update `log_connections` configuration:

```sh
az postgres server configuration set --resource-group <resourceGroupName> --server-name <serverName> --name log_connections --value on
```

## From PowerShell

Use the below command to update `log_connections` configuration:

```ps
Update-AzPostgreSqlConfiguration -ResourceGroupName <ResourceGroupName> -ServerName <ServerName> -Name log_connections -Value on
```
