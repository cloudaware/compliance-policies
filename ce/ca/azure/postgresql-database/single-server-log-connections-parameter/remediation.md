# Remediation

## From Azure Portal

1. Log in to Azure Portal using <https://portal.azure.com>.
2. Go to `Azure Database for PostgreSQL servers`.
3. For each database, under `Settings`, click `Server parameters`.
4. In the filter bar, type `log_connections`.
5. Set `log_connections` to `ON`.
6. Click `Save`.

## From Azure CLI

Use the following command to update `log_connections`:

```sh
az postgres server configuration set \
    --resource-group {{resource-group-name}} \
    --server-name {{server-name}} \
    --name log_connections \
    --value on
```

## From PowerShell

Use the following command to update `log_connections`:

```ps
Update-AzPostgreSqlConfiguration `
    -ResourceGroupName {{resource-group-name}} `
    -ServerName {{server-name}} `
    -Name log_connections `
    -Value on
```
