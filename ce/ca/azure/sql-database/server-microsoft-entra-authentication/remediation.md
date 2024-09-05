# Remediation

## From Azure Portal

1. Go to `SQL servers`.
2. For each SQL server, click on `Microsoft Entra admin`.
3. Click on `Set admin`.
4. Select an admin.
5. Click `Save`.

## From Azure CLI

```sh
az ad user show --id
```

For each Server, set AD Admin:

```sh
az sql server ad-admin create --resource-group <resource group name> --server <server name> --display-name <display name> --object-id <object id of user>
```

## From PowerShell

For each Server, set Entra ID Admin:

```ps
Set-AzSqlServerActiveDirectoryAdministrator -ResourceGroupName <resource group name> -ServerName <server name> -DisplayName "<Display name of AD account to set as DB administrator>"
```
