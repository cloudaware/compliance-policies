# Remediation

## From Azure Portal

1. From Azure Home, select the Portal Menu.
2. Go to `Azure Database` for `PostgreSQL servers`.
3. For each database, under `Settings`, click `Server parameters`.
4. Search for `log_disconnections`.
5. Set `log_disconnections` to `ON`.
6. Click `Save`.

## From Azure CLI

Use the following command to update `log_disconnections`:

```sh
az postgres server configuration set \
    --resource-group {{resource-group-name}} \
    --server-name {{server-name}} \
    --name log_disconnections \
    --value on
```

## From PowerShell

Use the following command to update `log_disconnections`:

```ps
Update-AzPostgreSqlConfiguration `
    -ResourceGroupName {{resource-group-name}} `
    -ServerName {{server-name}} `
    -Name log_disconnections `
    -Value on
```
