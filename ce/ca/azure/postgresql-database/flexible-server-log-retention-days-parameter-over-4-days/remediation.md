# Remediation

## From Azure Portal

1. From Azure Home, select the Portal Menu.
2. Go to `Azure Database for PostgreSQL flexible servers`.
3. For each database, under `Settings`, click `Server parameters`.
4. In the filter bar, type `logfiles.retention_days`.
5. Input a value between 4 and 7 (inclusive).
6. Click `Save`.

## From Azure CLI

Use the following command to update `logfiles.retention_days`:

```sh
az postgres flexible-server parameter set \
    --resource-group {{resource-group-name}} \
    --server-name {{server-name}} \
    --name logfiles.retention_days \
    --value {{retention-days}}
```

## From PowerShell

Use the following command to update `logfiles.retention_days`:

```ps
Update-AzPostgreSqlFlexibleServerConfiguration `
    -ResourceGroupName {{resource-group-name}} `
    -ServerName {{server-name}} `
    -Name logfiles.retention_days `
    -Value {{retention-days}}
```
