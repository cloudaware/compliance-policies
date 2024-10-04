# Remediation

## From Azure Portal

1. Go to `Storage Accounts`.
2. For each Storage Account, under `Data management`, go to `Data protection`.
3. Check the box next to `Enable soft delete for blobs`.
4. Check the box next to `Enable soft delete for containers`.
5. Set the retention period for both to a sufficient length for your organization.
6. Click `Save`.

## From Azure CLI

Update blob storage retention days in below command:

```sh
az storage blob service-properties delete-policy update --days-retained <RetentionDaysValue> --account-name <StorageAccountName> --account-key <AccountKey> --enable true
```

Update container retention with the below command:

```sh
az storage account blob-service-properties update --enable-container-delete-retention true --container-delete-retention-days <days> --account-name <storageAccount> --resource-group <resourceGroup>
```
