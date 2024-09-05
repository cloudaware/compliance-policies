# Remediation

## From Azure Portal

First, follow Microsoft documentation and create shared access signature tokens for your blob containers. Then:

1. Go to `Storage Accounts`.
2. For each storage account, under the `Security + networking` section, click `Networking`.
3. Set `Public Network Access` to `Disabled`.

## From Azure CLI

Set `Public Network Access` to `Disabled` on the storage account:

```sh
az storage account update --name <storage-account> --resource-group <resource-group> --public-network-access Disabled
```

## From PowerShell

For each Storage Account, run the following to set the `PublicNetworkAccess` setting to `Disabled`:

```ps
Set-AzStorageAccount -ResourceGroupName <resource group name> -Name <storage account name> -PublicNetworkAccess Disabled
```
