# Description

The Azure Storage blobs contain data like ePHI or Financial, which can be secret or personal. Data that is erroneously modified or deleted by an application or other storage account user will cause data loss or unavailability.

It is recommended that both Azure Containers with attached Blob Storage and standalone containers with Blob Storage be made recoverable by enabling the **soft delete** configuration. This is to save and recover data when blobs or blob snapshots are deleted.

## Rationale

Containers and Blob Storage data can be incorrectly deleted. An attacker/malicious user may do this deliberately in order to cause disruption. Deleting an Azure Storage blob causes immediate data loss. Enabling this configuration for Azure storage ensures that even if blobs/data were deleted from the storage account, Blobs/data objects are recoverable for a particular time which is set in the "Retention policies," ranging from 1 day to 365 days.

## Impact

Additional storage costs may be incurred as snapshots are retained.

## Audit

### From Azure Portal

1. From the Azure home page, open the hamburger menu in the top left or click on the arrow pointing right with `More services` underneath.
2. Select `Storage`.
3. Select `Storage Accounts`.
4. For each Storage Account, navigate to `Data protection` in the left scroll column.
5. Ensure that `soft delete` is checked for both blobs and containers. Also check if the `retention period` is a sufficient length for your organization.

### From Azure CLI

Blob Storage: Ensure that the output of the below command contains enabled status as true and days is not empty or null:

```sh
az storage blob service-properties delete-policy show --account-name <StorageAccountName> --account-key <accountkey>
```

Azure Containers: Make certain that the --enable-container-delete-retention is `true`:

```sh
az storage account blob-service-properties show --account-name <StorageAccountName> --account-key <accountkey> --resource-group <resource_group>
```

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [ea39f60f-9f00-473c-8604-be5eac4bb088](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Fea39f60f-9f00-473c-8604-be5eac4bb088) - **Name**: `Configure blob soft delete on a storage account`

## Default Value

When a new storage account is created, soft delete for containers and blob storage is by default `disabled`.

## References

1. <https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-soft-delete>
2. <https://docs.microsoft.com/en-us/azure/storage/blobs/soft-delete-container-overview>
3. <https://docs.microsoft.com/en-us/azure/storage/blobs/soft-delete-container-enable?tabs=azure-portal>
