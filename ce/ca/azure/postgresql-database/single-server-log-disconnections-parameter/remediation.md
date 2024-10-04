# Remediation

## From Azure Portal

1. From Azure Home select the Portal Menu.
2. Go to `Azure Database` for `PostgreSQL servers`.
3. For each database, under `Settings`, click `Server parameters`.
4. Search for `log_disconnections`.
5. Set `log_disconnections` to ON.
6. Click `Save`.

## From Azure CLI

Use the below command to update `log_disconnections` configuration:

```sh
az postgres server configuration set --resource-group <resourceGroupName> --server-name <serverName> --name log_disconnections --value on
```

## From PowerShell

Use the below command to update `log_disconnections` configuration:

```ps
Update-AzPostgreSqlConfiguration -ResourceGroupName <ResourceGroupName> -ServerName <ServerName> -Name log_disconnections -Value on
```
