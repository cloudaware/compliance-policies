# Description

Expire shared access signature tokens within an hour.

## Rationale

A shared access signature (SAS) is a URI that grants restricted access rights to Azure Storage resources. A shared access signature can be provided to clients who should not be trusted with the storage account key but for whom it may be necessary to delegate access to certain storage account resources. Providing a shared access signature URI to these clients allows them access to a resource for a specified period of time. This time should be set as low as possible and preferably no longer than an hour.

## Audit

Currently, SAS token expiration times cannot be audited. Until Microsoft makes token expiration time a setting rather than a token creation parameter, this recommendation would require a manual verification.

## Default Value

By default, expiration for shared access signature is set to 8 hours.

## References

1. <https://docs.microsoft.com/en-us/rest/api/storageservices/delegating-access-with-a-shared-access-signature>
2. <https://docs.microsoft.com/en-us/azure/storage/common/storage-sas-overview>
