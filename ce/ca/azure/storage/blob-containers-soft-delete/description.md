# Description

The Azure Storage blobs contain data like ePHI or Financial, which can be secret or personal. Data that is erroneously modified or deleted by an application or other storage account user will cause data loss or unavailability.

It is recommended that both Azure Containers with attached Blob Storage and standalone containers with Blob Storage be made recoverable by enabling the **soft delete** configuration. This is to save and recover data when blobs or blob snapshots are deleted.

## Rationale

Containers and Blob Storage data can be incorrectly deleted. An attacker/malicious user may do this deliberately in order to cause disruption. Deleting an Azure Storage blob causes immediate data loss. Enabling this configuration for Azure storage ensures that even if blobs/data were deleted from the storage account, Blobs/data objects are recoverable for a particular time which is set in the "Retention policies," ranging from 1 day to 365 days.

## Impact

Additional storage costs may be incurred as snapshots are retained.

## Audit

This policy flags an *Azure Storage Account* as `INCOMPLIANT` if either the `Blob Retention Policy State` or the `Container Retention Policy State` is not set to **Enabled**, or if the corresponding `Retention Policy Days` values are **empty**.

## Default Value

Soft delete for containers and blob storage is **enabled** by default on storage accounts created via the Azure Portal, and **disabled** by default on storage accounts created via Azure CLI or PowerShell.

## References

1. <https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-soft-delete>
2. <https://docs.microsoft.com/en-us/azure/storage/blobs/soft-delete-container-overview>
3. <https://docs.microsoft.com/en-us/azure/storage/blobs/soft-delete-container-enable?tabs=azure-portal>
