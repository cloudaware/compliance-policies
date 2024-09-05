# Remediation

## From Azure Portal

1. Go to `SQL databases`.
2. For each DB instance.
3. Click on `Transparent data encryption`.
4. Set `Data encryption` to `On`.

## From Azure CLI

Use the below command to enable `Transparent data encryption` for SQL DB instance:

```sh
az sql db tde set --resource-group <resourceGroup> --server <dbServerName> --database <dbName> --status Enabled
```

## From PowerShell

Use the below command to enable Transparent data encryption for SQL DB instance:

```ps
Set-AzSqlDatabaseTransparentDataEncryption -ResourceGroupName <Resource Group Name> -ServerName <SQL Server Name> -DatabaseName <Database Name> -State 'Enabled'
```

**Note**:

- TDE cannot be used to encrypt the logical master database in SQL Database. The master database contains objects that are needed to perform the TDE operations on the user databases.
- Azure Portal does not show master databases per SQL server. However, CLI/API responses will show master databases.
