# Description

The Azure Storage blobs contain data like ePHI or Financial, which can be secret or personal. Data that is erroneously modified or deleted by an application or other storage account user will cause data loss or unavailability.

It is recommended that both Azure Containers with attached Blob Storage and standalone containers with Blob Storage be made recoverable by enabling the **soft delete** configuration. This is to save and recover data when blobs or blob snapshots are deleted.

## Rationale

Containers and Blob Storage data can be incorrectly deleted. An attacker/malicious user may do this deliberately in order to cause disruption. Deleting an Azure Storage blob causes immediate data loss. Enabling this configuration for Azure storage ensures that even if blobs/data were deleted from the storage account, Blobs/data objects are recoverable for a particular time which is set in the "Retention policies," ranging from 1 day to 365 days.

## Impact

Additional storage costs may be incurred as snapshots are retained.

## Audit

### From Azure Portal

1. Go to `Storage Accounts`.
2. For each Storage Account, under `Data management`, go to `Data protection`.
3. Ensure that `Enable soft delete for blobs` is checked.
4. Ensure that `Enable soft delete for containers` is checked.
5. Ensure that the retention period for both is a sufficient length for your organization.

### From Azure CLI

Blob Storage: Ensure that the output of the below command contains enabled status as true and days is not empty or null:

```sh
az storage blob service-properties delete-policy show --account-name <StorageAccountName> --account-key <accountkey>
```

Azure Containers: Make certain that the --enable-container-delete-retention is `true`:

```sh
az storage account blob-service-properties show --account-name <StorageAccountName> --resource-group <resourceGroup>
```

## Default Value

Soft delete for containers and blob storage is **enabled** by default on storage accounts created via the Azure Portal, and **disabled** by default on storage accounts created via Azure CLI or PowerShell.

## References

1. <https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-soft-delete>
2. <https://docs.microsoft.com/en-us/azure/storage/blobs/soft-delete-container-overview>
3. <https://docs.microsoft.com/en-us/azure/storage/blobs/soft-delete-container-enable?tabs=azure-portal>
