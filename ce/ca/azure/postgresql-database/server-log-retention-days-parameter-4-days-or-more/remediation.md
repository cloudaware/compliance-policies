# Remediation

## From Azure Portal

1. From Azure Home select the Portal Menu.
2. Go to `Azure Database for PostgreSQL servers`.
3. For each database, click on `Server parameters`.
4. Search for `log_retention_days`.
5. Input a value between 4 and 7 (inclusive) and click `Save`.

## From Azure CLI

Use the below command to update `log_retention_days` configuration:

```sh
az postgres server configuration set --resource-group <resourceGroupName> --server-name <serverName> --name log_retention_days --value <4-7>
```

## From Powershell

Use the below command to update `log_retention_days` configuration:

```ps
Update-AzPostgreSqlConfiguration -ResourceGroupName <ResourceGroupName> -ServerName <ServerName> -Name log_retention_days -Value <4-7>
```
