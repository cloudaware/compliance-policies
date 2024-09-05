# Description

Enable Transparent Data Encryption on every SQL server.

## Rationale

Azure SQL Database transparent data encryption helps protect against the threat of malicious activity by performing real-time encryption and decryption of the database, associated backups, and transaction log files at rest without requiring changes to the application.

## Audit

### From Azure Portal

1. Go to `SQL databases`.
2. For each DB instance.
3. Click on `Transparent data encryption`.
4. Ensure that `Data encryption` is set to `On`.

### From Azure CLI

Ensure the output of the below command is `Enabled`:

```sh
az sql db tde show --resource-group <resourceGroup> --server <dbServerName> --database <dbName> --query status
```

### From PowerShell

Get a list of SQL Servers:

```ps
Get-AzSqlServer
```

For each server, list the databases:

```ps
Get-AzSqlDatabase -ServerName <SQL Server Name> -ResourceGroupName <Resource Group Name>
```

For each database not listed as a `Master` database, check for Transparent Data Encryption:

```ps
Get-AzSqlDatabaseTransparentDataEncryption -ResourceGroupName <Resource Group Name> -ServerName <SQL Server Name> -DatabaseName <Database Name>
```

Make sure `DataEncryption` is `Enabled` for each database except the Master database.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [17k78e20-9358-41c9-923c-fb736d382a12](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F17k78e20-9358-41c9-923c-fb736d382a12) - **Name**: `Transparent Data Encryption on SQL databases should be enabled`

## Default Value

By default, `Data encryption` is set to `On`.

## References

1. <https://docs.microsoft.com/en-us/sql/relational-databases/security/encryption/transparent-data-encryption-with-azure-sql-database>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-data-protection#dp-4-enable-data-at-rest-encryption-by-default>
3. <https://learn.microsoft.com/en-us/powershell/module/az.sql/set-azsqldatabasetransparentdataencryption?view=azps-9.2.0>

## Additional Information

- Transparent Data Encryption (TDE) can be enabled or disabled on individual `SQL Database` level and not on the `SQL Server` level.
- TDE cannot be used to encrypt the logical master database in SQL Database. The master database contains objects that are needed to perform the TDE operations on the user databases.
