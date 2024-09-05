# Remediation

## From Azure Portal

1. Go to `Storage Accounts`.
2. For each storage account, Click on the `Networking` blade.
3. Click on the `Firewalls and virtual networks` heading.
4. Ensure that `Enabled from selected virtual networks and IP addresses` is selected.
5. Under the `Exceptions` label, enable check box for `Allow Azure services on the trusted services list to access this storage account`.
6. Click `Save` to apply your changes.

## From Azure CLI

Use the below command to update `Azure services`:

```sh
az storage account update --name <StorageAccountName> --resource-group <resourceGroupName> --bypass AzureServices
```
