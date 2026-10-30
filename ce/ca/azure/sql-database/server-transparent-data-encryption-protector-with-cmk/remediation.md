# Remediation

## From Azure Portal

1. Go to `SQL servers`.
2. For each SQL server, under `Security`, click `Transparent data encryption`.
3. Set `Transparent data encryption` to `Customer-managed key`.
4. Select a key or enter a key identifier.
5. Check `Make this key the default TDE protector`.
6. Click `Save`.

## From Azure CLI

Use the following command to encrypt the SQL server TDE protector with a customer-managed key:

```sh
az sql server tde-key set \
    --resource-group {{resource-group-name}} \
    --server {{server-name}} \
    --server-key-type AzureKeyVault \
    --kid {{key-identifier}}
```

## From PowerShell

Use the following command to encrypt the SQL server TDE protector with a customer-managed Key Vault key:

```ps
Set-AzSqlServerTransparentDataEncryptionProtector `
    -Type AzureKeyVault `
    -KeyId {{key-identifier}} `
    -ServerName {{server-name}} `
    -ResourceGroupName {{resource-group-name}}
```

Select `Y` when prompted.
