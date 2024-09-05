# Remediation

## From Azure Portal

1. From the Azure home page, open the hamburger menu in the top left or click on the arrow pointing right with `More services` underneath.
2. Select `Storage`.
3. Select `Storage Accounts`.
4. For each Storage Account, navigate to `Data protection` in the left scroll column.
5. Check `soft delete` for both blobs and containers. Set the `retention period` to a sufficient length for your organization.

## From Azure CLI

Update blob storage retention days in below command:

```sh
az storage blob service-properties delete-policy update --days-retained <RetentionDaysValue> --account-name <StorageAccountName> --account-key <AccountKey> --enable true
```

Update container retention with the below command:

```sh
az storage account blob-service-properties update --enable-container-delete-retention true --container-delete-retention-days <days> --account-name <storage-account> --resource-group <resource_group> --account-key <AccountKey>
```
