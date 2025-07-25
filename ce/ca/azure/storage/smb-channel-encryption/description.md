# Description

Implement SMB channel encryption with AES-256-GCM for SMB file shares to ensure data confidentiality and integrity in transit. This method offers strong protection against eavesdropping and man-in-the-middle attacks, safeguarding sensitive information.

## Rationale

AES-256-GCM encryption enhances the security of data transmitted over SMB channels by safeguarding it from unauthorized interception and tampering.

## Impact

Using the AES-256-GCM SMB channel encryption may impact client compatibility.

## Audit

This policy flags an *Azure Storage File* as `INCOMPLIANT` if `Protocol Settings Channel Encryption` is **empty** or includes **AES-128-CCM** or **AES-128-GCM**.

## Default Value

By default, the following SMB channel encryption algorithms are allowed:

- AES-128-CCM
- AES-128-GCM
- AES-256-GCM

## References

1. <https://learn.microsoft.com/en-us/azure/well-architected/service-guides/azure-files#recommendations-for-smb-file-shares>
2. <https://learn.microsoft.com/en-us/azure/storage/files/files-smb-protocol?tabs=azure-portal#smb-security-settings>
3. <https://learn.microsoft.com/en-us/cli/azure/storage/account/file-service-properties>
4. <https://learn.microsoft.com/en-us/powershell/module/az.storage/get-azstoragefileserviceproperty>
5. <https://learn.microsoft.com/en-us/powershell/module/az.storage/update-azstoragefileserviceproperty>
