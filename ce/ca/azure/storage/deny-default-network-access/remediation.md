# Remediation

## From Azure Portal

1. Go to `Storage Accounts`.
2. For each storage account, under `Security + networking`, click `Networking`.
3. Click the `Firewalls and virtual networks` heading.
4. Set `Public network access` to `Enabled from selected virtual networks and IP addresses`.
5. Add rules to allow traffic from specific networks and IP addresses.
6. Click `Save`.

## From Azure CLI

Use the following command to update `default-action` to `Deny`:

```sh
az storage account update \
    --name {{storage-account-name}} \
    --resource-group {{resource-group-name}} \
    --default-action Deny
```
