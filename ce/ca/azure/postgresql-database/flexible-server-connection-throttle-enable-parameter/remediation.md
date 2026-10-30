# Remediation

## From Azure Portal

1. Log in to Azure Portal using <https://portal.azure.com>.
2. Go to `Azure Database for PostgreSQL flexible servers`.
3. For each database, under `Settings`, click `Server parameters`.
4. Search for `connection_throttle.enable`.
5. Set `connection_throttle.enable` to `ON`.
6. Click `Save`.

## From Azure CLI

Use the following command to enable `connection_throttle.enable`:

```sh
az postgres flexible-server parameter set \
    --resource-group {{resource-group-name}} \
    --server-name {{server-name}} \
    --name connection_throttle.enable \
    --value on
```

## From PowerShell

Use the following command to update `connection_throttle.enable`:

```ps
Update-AzPostgreSqlFlexibleServerConfiguration `
    -ResourceGroupName {{resource-group-name}} `
    -ServerName {{server-name}} `
    -Name connection_throttle.enable `
    -Value on
```
