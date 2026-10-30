# Remediation

## From Azure Portal

1. Log in to Azure Portal using <https://portal.azure.com>.
2. Go to Azure Database for `PostgreSQL server`.
3. For each database, click on `Connection security`.
4. In `SSL` settings, click on `ENABLED` to enforce SSL connections.
5. Click `Save`.

## From Azure CLI

Use the following command to enforce SSL connections for PostgreSQL:

```sh
az postgres server update \
    --resource-group {{resource-group-name}} \
    --name {{server-name}} \
    --ssl-enforcement Enabled
```

## From PowerShell

```ps
Update-AzPostgreSqlServer `
    -ResourceGroupName {{resource-group-name}} `
    -ServerName {{server-name}} `
    -SslEnforcement Enabled
```
