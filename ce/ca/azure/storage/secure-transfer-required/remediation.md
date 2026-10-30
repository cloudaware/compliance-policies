# Remediation

## From Azure Portal

1. Go to `Storage Accounts`.
2. For each storage account, under `Settings`, click `Configuration`.
3. Set `Secure transfer required` to `Enabled`.
4. Click `Save`.

## From Azure CLI

Use the following command to enable `Secure transfer required` for a storage account:

```sh
az storage account update \
    --name {{storage-account-name}} \
    --resource-group {{resource-group-name}} \
    --https-only true
```
