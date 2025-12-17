# Description

Ensure that SMB file shares are configured to use the latest supported SMB protocol version. Keeping the SMB protocol updated helps mitigate risks associated with older SMB versions, which may contain vulnerabilities and lack essential security controls.

## Rationale

Using the latest supported SMB protocol version enhances the security of SMB file shares by preventing the exploitation of known vulnerabilities in outdated SMB versions.

## Impact

Using the latest SMB protocol version may impact client compatibility.

## Audit

This policy flags an *Azure Storage File* as `INCOMPLIANT` if `Protocol Settings SMB Versions` is **empty** or includes **SMB2.1** or **SMB3.0**.

## Default Value

By default, all SMB versions are allowed.

## References

1. <https://learn.microsoft.com/en-us/azure/well-architected/service-guides/azure-files#recommendations-for-smb-file-shares>
2. <https://learn.microsoft.com/en-us/azure/storage/files/files-smb-protocol#smb-security-settings>
3. <https://learn.microsoft.com/en-us/cli/azure/storage/account/file-service-properties>
4. <https://learn.microsoft.com/en-us/powershell/module/az.storage/get-azstoragefileserviceproperty>
5. <https://learn.microsoft.com/en-us/powershell/module/az.storage/update-azstoragefileserviceproperty>
