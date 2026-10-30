# Remediation

## From Azure Portal

1. Go to `SQL databases`.
2. For each DB instance, under `Security`, click `Data Encryption`.
3. Under `Transparent data encryption`, set `Data encryption` to `On`.
4. Click `Save`.

## From Azure CLI

Use the following command to enable `Transparent data encryption` for a SQL database:

```sh
az sql db tde set \
    --resource-group {{resource-group-name}} \
    --server {{server-name}} \
    --database {{database-name}} \
    --status Enabled
```

## From PowerShell

Use the following command to enable Transparent data encryption for a SQL database:

```ps
Set-AzSqlDatabaseTransparentDataEncryption `
    -ResourceGroupName {{resource-group-name}} `
    -ServerName {{sql-server-name}} `
    -DatabaseName {{database-name}} `
    -State "Enabled"
```

**Note**:

- TDE cannot be used to encrypt the logical master database in SQL Database. The master database contains objects that are needed to perform the TDE operations on the user databases.
- Azure Portal does not show master databases per SQL server. However, CLI/API responses will show master databases.
