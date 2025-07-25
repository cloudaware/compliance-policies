# Description

Every secure request to an Azure Storage account must be authorized. By default, requests can be authorized with either Microsoft Entra credentials or by using the account access key for Shared Key authorization.

## Rationale

Microsoft Entra ID provides superior security and ease of use compared to Shared Key and is recommended by Microsoft. To require clients to use Microsoft Entra ID for authorizing requests, you can disallow requests to the storage account that are authorized with Shared Key.

## Impact

When you disallow Shared Key authorization for a storage account, any requests to the account that are authorized with Shared Key, including shared access signatures (SAS), will be denied. Client applications that currently access the storage account using the Shared Key will no longer function.

## Audit

This policy flags an *Azure Storage Account* as `INCOMPLIANT` if the `Shared Key Access` configuration is **not** set to **Deny**.

## Default Value

The AllowSharedKeyAccess property of a storage account is not set by default and does not return a value until you explicitly set it. The storage account permits requests that are authorized with the Shared Key when the property value is **null** or when it is **true**.

## References

1. <https://learn.microsoft.com/en-us/azure/storage/common/shared-key-authorization-prevent>
2. <https://learn.microsoft.com/en-us/cli/azure/storage/account>
3. <https://learn.microsoft.com/en-us/powershell/module/az.storage/get-azstorageaccount>
4. <https://learn.microsoft.com/en-us/powershell/module/az.storage/set-azstorageaccount>
