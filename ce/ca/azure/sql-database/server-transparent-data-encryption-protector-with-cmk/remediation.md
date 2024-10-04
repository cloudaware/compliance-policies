# Remediation

## From Azure Console

1. Go to `SQL servers`.
2. For each SQL server, under `Security`, click `Transparent data encryption`.
3. Set `Transparent data encryption` to `Customer-managed key`.
4. Select a key or enter a key identifier.
5. Check `Make this key the default TDE protector`.
6. Click `Save`.

## From Azure CLI

Use the below command to encrypt SQL server's TDE protector with a Customer-managed key:

```sh
az sql server tde-key set --resource-group <resourceName> --server <dbServerName> --server-key-type {AzureKeyVault} --kid <keyIdentifier>
```

## From PowerShell

Use the below command to encrypt SQL server's TDE protector with a Customer-managed Key Vault key:

```ps
Set-AzSqlServerTransparentDataEncryptionProtector -Type AzureKeyVault -KeyId <KeyIdentifier> -ServerName <ServerName> -ResourceGroupName <ResourceGroupName>
```

Select `Y` when prompted.
