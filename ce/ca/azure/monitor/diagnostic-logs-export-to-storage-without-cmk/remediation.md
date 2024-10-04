# Remediation

## From Azure Portal

1. Go to `Monitor`.
2. Select `Activity log`.
3. Select `Export Activity Logs`.
4. Select a `Subscription`.
5. Note the name of the `Storage Account` for the diagnostic setting.
6. Navigate to `Storage accounts`.
7. Click on the storage account.
8. Under `Security + networking`, click `Encryption`.
9. Next to `Encryption type`, select `Customer-managed keys`.
10. Complete the steps to configure a customer-managed key for encryption of the storage account.

## From Azure CLI

```sh
az storage account update --name <name of the storage account> --resource-group <resource group for a storage account> --encryption-key-source=Microsoft.Keyvault --encryption-key-vault <Key Vault URI> --encryption-key-name <KeyName> --encryption-key-version <Key Version>
```

## From PowerShell

```ps
Set-AzStorageAccount -ResourceGroupName <resource group name> -Name <storage account name> -KeyvaultEncryption -KeyVaultUri <key vault URI> -KeyName <key name>
```
