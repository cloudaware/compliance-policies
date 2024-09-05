# Remediation

## From Azure Portal

1. Navigate to the Storage accounts blade.
2. Click on the storage account.
3. Under `Security + networking`, click `Encryption`.
4. Next to `Encryption type`, select `Customer-managed keys`.
5. Complete the steps to configure a customer-managed key for encryption of the storage account.

## From Azure CLI

```sh
az storage account update --name <name of the storage account> --resource-group <resource group for a storage account> --encryption-key-source=Microsoft.Keyvault --encryption-key-vault <Key Vault URI> --encryption-key-name <KeyName> --encryption-key-version <Key Version>
```

## From PowerShell

```ps
Set-AzStorageAccount -ResourceGroupName <resource group name> -Name <storage account name> -KeyvaultEncryption -KeyVaultUri <key vault URI> -KeyName <key name>
```
