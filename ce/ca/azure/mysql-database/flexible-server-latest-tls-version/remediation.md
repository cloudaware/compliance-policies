# Remediation

## From Azure Portal

1. Login to Azure Portal using <https://portal.azure.com>.
2. Go to `Azure Database for MySQL flexible servers`.
3. For each database, under `Settings`, click `Server parameters`.
4. In the filter bar, type `tls_version`.
5. Click on the VALUE dropdown next to `tls_version`, and check `TLSv1.2` (or higher).
6. Uncheck anything lower than `TLSv1.2`.
7. Click `Save`.

## From Azure CLI

Use the below command to update MySQL flexible servers to use TLS version 1.2:

```sh
az mysql flexible-server parameter set --resource-group <resourceGroup> --server-name <serverName> --name tls_version --value TLSv1.2
```

## From PowerShell

Use the below command to update MySQL flexible servers to use TLS version 1.2:

```ps
Update-AzMySqlFlexibleServerConfiguration -ResourceGroupName <resourceGroup> -ServerName <serverName> -Name tls_version -Value TLSv1.2
```
