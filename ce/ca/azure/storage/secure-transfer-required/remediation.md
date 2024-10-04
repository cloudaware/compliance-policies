# Remediation

## From Azure Portal

1. Go to `Storage Accounts`.
2. For each storage account, under `Settings`, click `Configuration`.
3. Set `Secure transfer required` to `Enabled`.
4. Click `Save`.

## From Azure CLI

Use the below command to enable `Secure transfer required` for a `Storage Account`:

```sh
az storage account update --name <storageAccountName> --resource-group <resourceGroupName> --https-only true
```
