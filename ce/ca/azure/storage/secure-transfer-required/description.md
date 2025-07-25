# Description

Enable data encryption in transit.

## Rationale

The secure transfer option enhances the security of a storage account by only allowing requests to the storage account by a secure connection. For example, when calling REST APIs to access storage accounts, the connection must use HTTPS. Any requests using HTTP will be rejected when 'secure transfer required' is enabled. When using the Azure files service, connection without encryption will fail, including scenarios using SMB 2.1, SMB 3.0 without encryption, and some flavors of the Linux SMB client. Because Azure storage doesn’t support HTTPS for custom domain names, this option is not applied when using a custom domain name.

## Audit

This policy flags an *Azure Storage Account* as `INCOMPLIANT` if its `Secure Transfer Required` is set to **false**.

## Default Value

By default, `Secure transfer required` is set to `Disabled`.

## References

1. <https://docs.microsoft.com/en-us/azure/storage/blobs/security-recommendations#encryption-in-transit>
2. <https://docs.microsoft.com/en-us/cli/azure/storage/account?view=azure-cli-latest#az_storage_account_list>
3. <https://docs.microsoft.com/en-us/cli/azure/storage/account?view=azure-cli-latest#az_storage_account_update>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-data-protection#dp-3-encrypt-sensitive-data-in-transit>
