# Description

Azure Storage containers can contain data such as ePHI or financial records, which can be sensitive or personal. Data that is modified or deleted in error by an application or other storage account user can cause data loss or unavailability.

It is recommended that Blob Storage containers be made recoverable by enabling the **soft delete for containers** configuration. This saves and recovers data when containers are deleted.

## Rationale

Containers can be deleted incorrectly. An attacker or malicious user may do this deliberately to cause disruption. Deleting a container causes immediate data loss. Enabling this configuration for Azure Storage ensures that even if containers are deleted from the storage account, those containers are recoverable for a defined retention period.

## Impact

Additional storage costs may be incurred as snapshots are retained.

## Audit

This policy flags an *Azure Storage Account* as `INCOMPLIANT` if the `Container Retention Policy State` is not set to **Enabled**, or if `Container Retention Policy Days` is **empty**.

## Default Value

Soft delete for containers is **enabled** by default on storage accounts created via the Azure Portal, and **disabled** by default on storage accounts created via Azure CLI or PowerShell.

## References

1. <https://docs.microsoft.com/en-us/azure/storage/blobs/soft-delete-container-overview>
2. <https://docs.microsoft.com/en-us/azure/storage/blobs/soft-delete-container-enable?tabs=azure-portal>
