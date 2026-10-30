# Remediation

## From Azure Portal

First, follow Microsoft documentation and create shared access signature tokens for your blob containers. Then disable public network access:

1. Go to `Storage Accounts`.
2. For each storage account, under the `Security + networking` section, click `Networking`.
3. Set `Public Network Access` to `Disabled`.
4. Click `Save`.

If public network access is required, set `Public network access` to `Enabled from selected virtual networks and IP addresses`, set the default network access rule to `Deny`, add the required network rules, and enable the trusted Azure services exception where those services need access.

## From Azure CLI

Set `Public Network Access` to `Disabled` on the storage account:

```sh
az storage account update \
    --name {{storage-account-name}} \
    --resource-group {{resource-group-name}} \
    --public-network-access Disabled
```

If public network access is required, restrict access to selected networks and enable the trusted Azure services exception:

```sh
az storage account update \
    --name {{storage-account-name}} \
    --resource-group {{resource-group-name}} \
    --public-network-access Enabled \
    --default-action Deny \
    --bypass AzureServices
```

## From PowerShell

For each Storage Account, run the following to set the `PublicNetworkAccess` setting to `Disabled`:

```ps
Set-AzStorageAccount `
    -ResourceGroupName {{resource-group-name}} `
    -Name {{storage-account-name}} `
    -PublicNetworkAccess Disabled
```
