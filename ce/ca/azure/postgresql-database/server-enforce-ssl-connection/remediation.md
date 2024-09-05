# Remediation

## From Azure Portal

1. Login to Azure Portal using <https://portal.azure.com>.
2. Go to Azure Database for `PostgreSQL server`.
3. For each database, click on `Connection security`.
4. In `SSL` settings, click on `ENABLED` to enforce SSL connections.
5. Click `Save`.

## From Azure CLI

Use the below command to `enforce ssl connection` for `PostgreSQL` Database:

```sh
az postgres server update --resource-group <resourceGroupName> --name <serverName> --ssl-enforcement Enabled
```

## From PowerShell

```ps
Update-AzPostgreSqlServer -ResourceGroupName <ResourceGroupName > -ServerName <ServerName> -SslEnforcement Enabled
```
