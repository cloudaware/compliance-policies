# Description

The Azure Storage setting ‘Allow Blob Anonymous Access’ (aka "allowBlobPublicAccess") controls whether anonymous access is allowed for blob data in a storage account. When this property is set to True, it enables public read access to blob data, which can be convenient for sharing data but may carry security risks. When set to False, it disallows public access to blob data, providing a more secure storage environment.

## Rationale

If "Allow Blob Anonymous Access" is enabled, blobs can be accessed by adding the blob name to the URL to see the contents. An attacker can enumerate a blob using methods, such as brute force, and access them.
Exfiltration of data by brute force enumeration of items from a storage account may occur if this setting is set to 'Enabled'.

## Impact

Additional consideration may be required for exceptional circumstances where elements of a storage account require public accessibility. In these circumstances, it is highly recommended that all data stored in the public facing storage account be reviewed for sensitive or potentially compromising data, and that sensitive or compromising data is never stored in these storage accounts.

## Audit

### From Azure Portal

1. Open the Storage Accounts blade.
2. Click on a Storage Account.
3. In the storage account menu pane, under the Settings section, click `Configuration`.
4. Under `Allow Blob Anonymous Access` ensure that the selected setting is `Disabled`.

Repeat these steps for each Storage Account.

### From Azure CLI

For every storage account in scope:

```sh
az storage account show --Name "<yourStorageAccountName>" --query allowBlobPublicAccess
```

Ensure that every storage account in scope returns `false` for the `allowBlobPublicAccess` setting.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [13502221-8df0-4414-9937-de9c5c4e396b](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%13502221-8df0-4414-9937-de9c5c4e396b) - **Name**: `Configure your Storage account public access to be disallowed`

## Default Value

By default, `allowBlobPublicAccess` is `Disabled`.

## References

1. <https://learn.microsoft.com/en-us/azure/storage/blobs/anonymous-read-access-prevent?tabs=portal>
2. <https://learn.microsoft.com/en-us/azure/storage/blobs/anonymous-read-access-prevent?source=recommendations&tabs=portal>
3. Classic Storage Accounts: <https://learn.microsoft.com/en-us/azure/storage/blobs/anonymous-read-access-prevent-classic?tabs=portal>

## Additional Information

Azure Storage accounts that use the classic deployment model will be retired on August 31, 2024.
