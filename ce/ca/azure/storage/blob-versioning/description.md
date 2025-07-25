# Description

Enabling blob versioning allows for the automatic retention of previous versions of objects. With blob versioning enabled, earlier versions of a blob are accessible for data recovery in the event of modifications or deletions.

## Rationale

Blob versioning safeguards data integrity and enables recovery by retaining previous versions of stored objects, facilitating quick restoration from accidental deletion, modification, or malicious activity.

## Impact

Enabling blob versioning for a storage account creates a new version with each write operation to a blob, which can increase storage costs. To control these costs, a lifecycle management policy can be applied to automatically delete older versions.

## Audit

This policy flags an *Azure Storage Account* as `INCOMPLIANT` if `Blob Versioning` is set to **Disabled**.

## Default Value

Blob versioning is disabled by default on storage accounts.

## References

1. <https://learn.microsoft.com/en-us/cli/azure/storage/account>
2. <https://learn.microsoft.com/en-us/cli/azure/storage/account/blob-service-properties>
3. <https://learn.microsoft.com/en-us/powershell/module/az.storage/get-azstorageaccount>
4. <https://learn.microsoft.com/en-us/powershell/module/az.storage/new-azstoragecontext>
5. <https://learn.microsoft.com/en-us/powershell/module/az.storage/get-azstoragecontainer>
6. <https://learn.microsoft.com/en-us/powershell/module/az.storage/get-azstorageblobserviceproperty>
7. <https://learn.microsoft.com/en-us/powershell/module/az.storage/update-azstorageblobserviceproperty>
8. <https://learn.microsoft.com/en-us/azure/storage/blobs/versioning-overview>
9. <https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-overview>
