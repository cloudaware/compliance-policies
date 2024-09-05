# Remediation

## From Azure Console

1. Login to the Azure Portal.
2. Go to `Storage Accounts`.
3. Click on each Storage Account.
4. Under `Setting` section, Click on `Configuration`.
5. Set the `minimum TLS version` to be Version 1.2.

## From Azure CLI

```sh
az storage account update \ 
    --name <storage-account> \ 
    --resource-group <resource-group> \ 
    --min-tls-version TLS1_2
```

## From Azure PowerShell

To set the minimum TLS version, run the following command:

```ps
Set-AzStorageAccount -AccountName <STORAGEACCOUNTNAME> ` -ResourceGroupName <RESOURCEGROUPNAME> ` -MinimumTlsVersion TLS1_2
```
