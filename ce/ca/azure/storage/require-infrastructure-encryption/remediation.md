# Remediation

## From Azure Portal

1. During Storage Account creation, in the `Encryption` tab, check the box next to `Enable infrastructure encryption`.

## From Azure CLI

Replace the information within `<>` with appropriate values:

```sh
az storage account create \ --name <storage-account> \ --resource-group <resource-group> \ --location <location> \ --sku Standard_RAGRS \ --kind StorageV2 \ --require-infrastructure-encryption
```

## From PowerShell

Replace the information within `<>` with appropriate values:

```ps
New-AzStorageAccount -ResourceGroupName <resource_group> ` -AccountName <storage-account> ` -Location <location> ` -SkuName "Standard_RAGRS" ` -Kind StorageV2 ` -RequireInfrastructureEncryption
```

## Enabling Infrastructure Encryption after Storage Account Creation

If infrastructure encryption was not enabled on blob storage creation, there is no ***official*** way to enable it. Please see the additional information section.
