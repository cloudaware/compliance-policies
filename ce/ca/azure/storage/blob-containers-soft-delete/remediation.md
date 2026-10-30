# Remediation

## From Azure Portal

1. Go to `Storage Accounts`.
2. For each Storage Account, under `Data management`, go to `Data protection`.
3. Check the box next to `Enable soft delete for containers`.
4. Set the retention period to a sufficient length for your organization.
5. Click `Save`.

## From Azure CLI

Update container retention with the following command:

```sh
az storage account blob-service-properties update \
    --enable-container-delete-retention true \
    --container-delete-retention-days {{retention-days}} \
    --account-name {{storage-account-name}} \
    --resource-group {{resource-group-name}}
```
