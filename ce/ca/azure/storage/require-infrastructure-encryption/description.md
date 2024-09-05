# Description

Enabling encryption at the hardware level on top of the default software encryption for Storage Accounts accessing Azure storage solutions.

## Rationale

Azure Storage automatically encrypts all data in a storage account at the network level using 256-bit AES encryption, which is one of the strongest, FIPS 140-2-compliant block ciphers available. Customers who require higher levels of assurance that their data is secure can also enable 256-bit AES encryption at the Azure Storage infrastructure level for double encryption. Double encryption of Azure Storage data protects against a scenario where one of the encryption algorithms or keys may be compromised. Similarly, data is encrypted even before network transmission and in all backups. In this scenario, the additional layer of encryption continues to protect your data. For the most secure implementation of key based encryption, it is recommended to use a Customer Managed asymmetric RSA 2048 Key in Azure Key Vault.

## Impact

The read and write speeds to the storage will be impacted if both default encryption and Infrastructure Encryption are checked, as a secondary form of encryption requires more resource overhead for the cryptography of information. This performance impact should be considered in an analysis for justifying use of the feature in your environment. Customer-managed keys are recommended for the most secure implementation, leading to overhead of key management. The key will also need to be backed up in a secure location, as loss of the key will mean loss of the information in the storage.

## Audit

### From Azure Portal

1. From Azure Portal select the portal menu in the top left.
2. Select `Storage Accounts`.
3. Click on each storage account within each resource group you wish to audit.
4. In the overview, under Security, ensure `Infrastructure encryption` is set to `Enabled`.

### From Azure CLI

```sh
az storage blob show \ --account-name <storage-account> \ --container-name <container> \ --name <blob> \ --query "properties.serverEncrypted"
```

### From PowerShell

```ps
$account = Get-AzStorageAccount -ResourceGroupName <resource-group> ` -Name <storage-account> $blob = Get-AzStorageBlob -Context $account.Context ` -Container <container> ` -Blob <blob> $blob.ICloudBlob.Properties.IsServerEncrypted
```

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [4733ea7b-a883-42fe-8cac-97454c2a9e4a](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F4733ea7b-a883-42fe-8cac-97454c2a9e4a) - **Name**: `Storage accounts should have infrastructure encryption`

## Default Value

By default, Infrastructure Encryption is disabled in blob creation.

## References

1. <https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-encryption-status>
2. <https://docs.microsoft.com/en-us/azure/storage/common/storage-service-encryption>
3. <https://docs.microsoft.com/en-us/azure/storage/common/infrastructure-encryption-enable>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-data-protection#dp-4-enable-data-at-rest-encryption-by-default>

## Additional Information

The default service side encryption for Azure Storage is enabled on every block blob, append blob, or page blob that was written to Azure Storage after October 20, 2017. Hardware encryption, however, cannot be enabled on a blob storage after its creation. There are ways to copy all data from a blob storage into another or download and reupload into another blob storage. This could result in data loss and is not recommended.
