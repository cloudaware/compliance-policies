# Remediation

## From Azure Portal

1. Login to Azure Portal using <https://portal.azure.com>.
2. Go to `Azure Database for PostgreSQL flexible servers`.
3. For each database, under `Settings`, click `Server parameters`.
4. In the filter bar, type `require_secure_transport`.
5. Set the `VALUE` for `require_secure_transport` to `ON`.
6. Click `Save`.

## From Azure CLI

Use the below command to enable `require_secure_transport`:

```sh
az postgres flexible-server parameter set --resource-group <resourceGroup> --server-name <serverName> --name require_secure_transport --value on
```

## From PowerShell

```ps
Update-AzPostgreSqlFlexibleServerConfiguration -ResourceGroupName <resourceGroup> -ServerName <serverName> -Name require_secure_transport -Value on
```
