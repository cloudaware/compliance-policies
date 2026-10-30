# Description

Azure Storage blobs can contain data such as ePHI or financial records, which can be sensitive or personal. Data that is modified or deleted in error by an application or other storage account user can cause data loss or unavailability.

It is recommended that Azure Storage blobs be made recoverable by enabling the **soft delete for blobs** configuration. This saves and recovers data when blobs or blob snapshots are deleted.

## Rationale

Blobs can be deleted incorrectly. An attacker or malicious user may do this deliberately to cause disruption. Deleting a blob causes immediate data loss. Enabling this configuration for Azure Storage ensures that deleted blobs and blob snapshots are recoverable for a defined retention period.

## Impact

Additional storage costs may be incurred as deleted blobs and snapshots are retained.

## Audit

This policy flags an *Azure Storage Account* as `INCOMPLIANT` if the `Blob Retention Policy State` is not set to **Enabled**, or if `Blob Retention Policy Days` is **empty**.

## Default Value

Soft delete for blobs is **enabled** by default on storage accounts created via the Azure Portal, and **disabled** by default on storage accounts created via Azure CLI or PowerShell.

## References

1. <https://learn.microsoft.com/en-us/azure/storage/blobs/soft-delete-blob-overview>
2. <https://learn.microsoft.com/en-us/azure/storage/blobs/soft-delete-blob-enable?tabs=azure-portal>
