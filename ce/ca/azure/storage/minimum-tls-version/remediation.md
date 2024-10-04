# Remediation

## From Azure Console

1. Go to `Storage Accounts`.
2. For each storage account, under `Settings`, click `Configuration`.
3. Set the `Minimum TLS version` to `Version 1.2`.
4. Click `Save`.

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
