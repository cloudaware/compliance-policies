# Description

Disallowing public network access for a storage account overrides the public access settings for individual containers in that storage account for Azure Resource Manager Deployment Model storage accounts. Azure Storage accounts that use the classic deployment model will be retired on August 31, 2024.

## Rationale

The default network configuration for a storage account permits a user with appropriate permissions to configure public network access to containers and blobs in a storage account. Keep in mind that public access to a container is always turned off by default and must be explicitly configured to permit anonymous requests. It grants read-only access to these resources without sharing the account key, and without requiring a shared access signature. It is recommended not to provide public network access to storage accounts until, and unless, it is strongly desired. A shared access signature token or Azure AD RBAC should be used for providing controlled and timed access to blob containers.

## Impact

Access will have to be managed using shared access signatures or via Azure AD RBAC.

## Audit

This policy flags an *Azure Storage Account* as `INCOMPLIANT` if its `Public Network Access State` is set to **Enabled**.

## Default Value

By default, `Public Network Access` is set to `Enabled from all networks` for the Storage Account.

## References

1. <https://docs.microsoft.com/en-us/azure/storage/blobs/storage-manage-access-to-resources>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-governance-strategy#gs-2-define-and-implement-enterprise-segmentationseparation-of-duties-strategy>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-network-security#ns-2-secure-cloud-native-services-with-network-controls>
4. <https://docs.microsoft.com/en-us/azure/storage/blobs/assign-azure-role-data-access>
5. <https://learn.microsoft.com/en-us/azure/storage/common/storage-network-security?tabs=azure-portal>

## Additional Information

For classic storage accounts (to be retired on August 31, 2024), each container in the account must be configured to block anonymous access. Either configure all containers or to configure at the storage account level, migrate to the Azure Resource Manager deployment model.
