# Remediation

## From Azure Console

1. Go to `SQL servers`.

For the desired server instance:

2. Click On `Transparent data encryption`.
3. Set `Transparent data encryption` to `Customer-managed key`.
4. Browse through your `key vaults` to Select an existing key or create a new key in the Azure Key Vault.
5. Check `Make selected key the default TDE protector`.

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
