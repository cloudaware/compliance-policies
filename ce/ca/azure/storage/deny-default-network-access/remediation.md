# Remediation

## From Azure Console

1. Go to `Storage Accounts`.
2. For each storage account, Click on the `Networking` blade.
3. Click the `Firewalls and virtual networks` heading.
4. Ensure that you have elected to `allow access from Selected networks`.
5. Add rules to allow traffic from specific network.
6. Click Save to apply your changes.

## From Azure CLI

Use the below command to update `default-action` to `Deny`:

```sh
az storage account update --name <StorageAccountName> --resource-group <resourceGroupName> --default-action Deny
```
