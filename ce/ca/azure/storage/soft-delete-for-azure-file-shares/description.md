# Description

Azure Files offers soft delete for file shares, allowing you to easily recover your data when it is mistakenly deleted by an application or another storage account user.

## Rationale

Important data could be accidentally deleted or removed by a malicious actor. With soft delete enabled, the data is retained for the defined retention period before permanent deletion, allowing for recovery of the data.

## Impact

When a file share is soft-deleted, the used portion of the storage is charged for the indicated soft-deleted period. All other meters are not charged unless the share is restored.

## Audit

This policy flags an *Azure Storage File* as `INCOMPLIANT` if `Share Delete Retention Policy Status` is either **empty** or **Disabled**, or if `Share Delete Retention Policy Days` is **empty**.

## Default Value

Soft delete is enabled by default at the storage account file share setting level.

## References

1. <https://learn.microsoft.com/en-us/azure/storage/files/storage-files-enable-soft-delete>
2. <https://learn.microsoft.com/en-us/cli/azure/storage/account/file-service-properties>
3. <https://learn.microsoft.com/en-us/powershell/module/az.storage/get-azstoragefileserviceproperty>
4. <https://learn.microsoft.com/en-us/powershell/module/az.storage/update-azstoragefileserviceproperty>
5. <https://learn.microsoft.com/en-us/azure/storage/files/storage-files-prevent-file-share-deletion>
