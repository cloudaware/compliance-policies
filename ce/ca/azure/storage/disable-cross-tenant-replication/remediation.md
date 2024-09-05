# Remediation

## From Azure Portal

1. Navigate to `Storage Accounts`.
2. For each storage account, on the left blade under Data Management, click on `Object replication`.
3. Click on Advanced settings and uncheck `Allow cross-tenant replication`.
4. Click on `OK`.

## From Azure CLI

Replace the information within `<>` with appropriate values:

```sh
az storage account update --name <storageAccountName> --resource-group <resourceGroupName> --allow-cross-tenant-replication false
```
