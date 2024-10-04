# Remediation

## From Azure Portal

1. Go to `Storage Accounts`.
2. For each storage account, under `Monitoring`, click `Diagnostics settings`.
3. Select the `queue` tab indented below the storage account.
4. To create a new diagnostic setting, click `+ Add diagnostic setting`. To update an existing diagnostic setting, click `Edit setting` on the diagnostic setting.
5. Check the boxes next to `StorageRead`, `StorageWrite`, and `StorageDelete`.
6. Select an appropriate destination.
7. Click `Save`.

## From Azure CLI

Use the below command to enable the Storage Logging for Queue service:

```sh
az storage logging update --account-name <storageAccountName> --account-key <storageAccountKey> --services q --log rwd --retention 90
```
