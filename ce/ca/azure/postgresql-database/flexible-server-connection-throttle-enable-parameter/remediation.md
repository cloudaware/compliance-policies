# Remediation

## From Azure Portal

1. Login to Azure Portal using <https://portal.azure.com>.
2. Go to `Azure Database for PostgreSQL flexible servers`.
3. For each database, under `Settings`, click `Server parameters`.
4. Search for `connection_throttle.enable`.
5. Set `connection_throttle.enable` to `ON`.
6. Click `Save`.

## From Azure CLI

Use the below command to enable `connection_throttle.enable`:

```sh
az postgres flexible-server parameter set --resource-group <resourceGroup> --server-name <serverName> --name connection_throttle.enable --value on
```

## From PowerShell

Use the below command to update `connection_throttling` configuration:

```ps
Update-AzPostgreSqlFlexibleServerConfiguration -ResourceGroupName <resourceGroup> -ServerName <serverName> -Name connection_throttle.enable -Value on
```
