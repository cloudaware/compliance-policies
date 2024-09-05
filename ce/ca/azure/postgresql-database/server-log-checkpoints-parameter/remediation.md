# Remediation

## From Azure Portal

1. From Azure Home select the Portal Menu.
2. Go to `Azure Database for PostgreSQL servers`.
3. For each database, click on `Server parameters`.
4. Search for `log_checkpoints`.
5. Click ON and `save`.

## From Azure CLI

Use the below command to update `log_checkpoints` configuration:

```sh
az postgres server configuration set --resource-group <resourceGroupName> --server-name <serverName> --name log_checkpoints --value on
```

## From PowerShell

```ps
Update-AzPostgreSqlConfiguration -ResourceGroupName <ResourceGroupName> -ServerName <ServerName> -Name log_checkpoints -Value on
```
