# Description

The Azure Storage setting ‘Allow Blob Anonymous Access’ (aka "allowBlobPublicAccess") controls whether anonymous access is allowed for blob data in a storage account. When this property is set to True, it enables public read access to blob data, which can be convenient for sharing data but may carry security risks. When set to False, it disallows public access to blob data, providing a more secure storage environment.

## Rationale

If "Allow Blob Anonymous Access" is enabled, blobs can be accessed by adding the blob name to the URL to view the contents. An attacker can enumerate blobs using methods such as brute force and access them.

Exfiltration of data by brute force enumeration of items from a storage account may occur if this setting is set to `Enabled`.

## Impact

Additional consideration may be required for exceptional circumstances where elements of a storage account require public accessibility. In these circumstances, it is highly recommended that all data stored in the public facing storage account be reviewed for sensitive or potentially compromising data, and that sensitive or compromising data is never stored in these storage accounts.

## Audit

This policy marks an *Azure Storage Account* as `INCOMPLIANT` if **Blob Public Access** is `Allow` or unset. `Deny` is `COMPLIANT`.

## Default Value

An unset `allowBlobPublicAccess` is noncompliant. Explicitly set it to false (`Deny` in CMDB).

## References

1. <https://learn.microsoft.com/en-us/azure/storage/blobs/anonymous-read-access-prevent?tabs=portal>
2. <https://learn.microsoft.com/en-us/azure/storage/blobs/anonymous-read-access-prevent?source=recommendations&tabs=portal>
