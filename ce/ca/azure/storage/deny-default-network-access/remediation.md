# Remediation

## From Azure Console

1. Go to `Storage Accounts`.
2. For each storage account, under `Security + networking`, click `Networking`.
3. Click the `Firewalls and virtual networks` heading.
4. Set `Public network access` to `Enabled from selected virtual networks and IP addresses`.
5. Add rules to allow traffic from specific networks and IP addresses.
6. Click `Save`.

## From Azure CLI

Use the below command to update `default-action` to `Deny`:

```sh
az storage account update --name <StorageAccountName> --resource-group <resourceGroupName> --default-action Deny
```
