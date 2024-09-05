# Remediation

## From Azure Portal

1. Go to `Storage Accounts`.
2. For each storage account, go to `Configuration`.
3. Set `Secure transfer required` to `Enabled`.

## From Azure CLI

Use the below command to enable `Secure transfer required` for a `Storage Account`:

```sh
az storage account update --name <storageAccountName> --resource-group <resourceGroupName> --https-only true
```
