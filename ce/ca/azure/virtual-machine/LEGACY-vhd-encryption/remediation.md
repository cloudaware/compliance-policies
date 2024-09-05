# Remediation

## From Azure Portal

1. Navigate to the `Storage account` that you wish to encrypt.
2. Select `Encryption`.
3. Select the `Encryption type` that you wish to use.

If you wish to use a Microsoft-managed key (the default), you can save at this point and encryption will be applied to the account.

If you select `Customer-managed keys`, it will ask for the location of the key (The default is an Azure Key Vault) and the key name.

Once these are captured, save the configuration and the account will be encrypted using the provided key.

## From Azure CLI

Create the Key Vault:

```sh
az keyvault create --name <name> --resource-group <resourceGroup> --location <location> --enabled-for-disk-encryption
```

Encrypt the disk and store the key in Key Vault:

```sh
az vm encryption enable -g <resourceGroup> --name <name> --disk-encryption-keyvault myKV
```

## From PowerShell

This process uses a Key Vault to store the keys.

Create the Key Vault:

```ps
New-AzKeyvault -name <name> -ResourceGroupName <resourceGroup> -Location <location> -EnabledForDiskEncryption
```

Encrypt the disk and store the key in Key Vault:

```ps
$KeyVault = Get-AzKeyVault -VaultName <name> -ResourceGroupName <resourceGroup> Set-AzVMDiskEncryptionExtension -ResourceGroupName <resourceGroup> -VMName <name> -DiskEncryptionKeyVaultUrl $KeyVault.VaultUri -DiskEncryptionKeyVaultId $KeyVault.ResourceId
```
