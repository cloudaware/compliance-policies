# Remediation

## From Azure Portal

1. Go to `Storage Accounts`.
2. For each storage account, under `Data management`, click `Object replication`.
3. Click `Advanced settings`.
4. Uncheck `Allow cross-tenant replication`.
5. Click `OK`.

## From Azure CLI

Replace the information within `<>` with appropriate values:

```sh
az storage account update --name <storageAccountName> --resource-group <resourceGroupName> --allow-cross-tenant-replication false
```
