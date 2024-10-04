# Remediation

## From Azure Portal

1. Go to `Storage Accounts`.
2. For each storage account, under `Security + networking`, click `Networking`.
3. Click on the `Firewalls and virtual networks` heading.
4. Under `Exceptions`, check the box next to `Allow Azure services on the trusted services list to access this storage account`.
5. Click `Save`.

## From Azure CLI

Use the below command to update `bypass` to `Azure services`:

```sh
az storage account update --name <StorageAccountName> --resource-group <resourceGroupName> --bypass AzureServices
```
