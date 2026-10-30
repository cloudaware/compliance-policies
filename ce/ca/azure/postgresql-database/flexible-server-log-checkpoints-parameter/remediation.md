# Remediation

## From Azure Portal

1. From Azure Home, select the Portal Menu.
2. Go to `Azure Database for PostgreSQL flexible servers`.
3. For each database, under `Settings`, click `Server parameters`.
4. In the filter bar, type `log_checkpoints`.
5. Set the `VALUE` for `log_checkpoints` to `ON`.
6. Click `Save`.

## From Azure CLI

Use the following command to enable `log_checkpoints`:

```sh
az postgres flexible-server parameter set \
    --resource-group {{resource-group-name}} \
    --server-name {{server-name}} \
    --name log_checkpoints \
    --value on
```

## From PowerShell

```ps
Update-AzPostgreSqlFlexibleServerConfiguration `
    -ResourceGroupName {{resource-group-name}} `
    -ServerName {{server-name}} `
    -Name log_checkpoints `
    -Value on
```
