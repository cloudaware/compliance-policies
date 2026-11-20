# Remediation

## From Azure Portal

First, establish and test the required private endpoints or private network paths. Shared access signatures authorize requests but do not restore connectivity to a disabled public endpoint. Then disable public network access:

1. Go to `Storage Accounts`.
2. For each storage account, under the `Security + networking` section, click `Networking`.
3. Set `Public Network Access` to `Disabled`.
4. Click `Save`.


## From Azure CLI

Set `Public Network Access` to `Disabled` on the storage account:

```sh
az storage account update \
    --name {{storage-account-name}} \
    --resource-group {{resource-group-name}} \
    --public-network-access Disabled
```


## From PowerShell

For each Storage Account, run the following to set the `PublicNetworkAccess` setting to `Disabled`:

```ps
Set-AzStorageAccount `
    -ResourceGroupName {{resource-group-name}} `
    -Name {{storage-account-name}} `
    -PublicNetworkAccess Disabled
```
