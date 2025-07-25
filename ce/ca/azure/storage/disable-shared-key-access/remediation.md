# Remediation

## From Azure Portal

1. Go to `Storage accounts`.
2. Click the name of a storage account.
3. Under `Settings`, click `Configuration`.
4. Under `Allow storage account key access`, click the radio button next to `Disabled`.
5. Click `Save`.
6. Repeat steps 1-5 for each storage account requiring remediation.

## From Azure CLI

For each storage account requiring remediation, run the following command to disallow shared key authorization:

```sh
az storage account update --resource-group <resource-group> --name <storage-account> --allow-shared-key-access false
```

## From PowerShell

For each storage account requiring remediation, run the following command to disallow shared key authorization:

```ps
Set-AzStorageAccount -ResourceGroupName <resource-group> -Name <storage-account> -AllowSharedKeyAccess $false
```
