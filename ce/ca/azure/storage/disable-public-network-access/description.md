# Description

Disallowing public network access for a storage account overrides the public access settings for individual containers in that storage account for Azure Resource Manager Deployment Model storage accounts. Azure Storage accounts that use the classic deployment model will be retired on August 31, 2024.

## Rationale

Disabling public network access improves security by ensuring that a storage account is not exposed on the public internet.

The default network configuration for a storage account permits a user with appropriate permissions to configure public network access to containers and blobs in a storage account. Keep in mind that public access to a container is always turned off by default and must be explicitly configured to permit anonymous requests. It grants read-only access to these resources without sharing the account key, and without requiring a shared access signature. It is recommended not to provide public network access to storage accounts until, and unless, it is strongly desired. A shared access signature token or Azure AD RBAC should be used for providing controlled and timed access to blob containers.

## Impact

**NOTE:** Prior to disabling public network access, it is strongly recommended that, for each storage account, either:

- virtual network integration is completed
OR
- private endpoints/links are set up as described in **"Ensure Private Endpoints are used to access Storage Accounts."**

Disabling public network access restricts direct access to the service. This enhances security but will require the configuration of a virtual network and/or private endpoints for any services or users needing access within trusted networks.

Access will have to be managed using shared access signatures or via Azure AD RBAC.

## Audit

This policy flags an *Azure Storage Account* as `INCOMPLIANT` if its `Public Network Access State` is set to **Enabled**.

## Default Value

By default, `Public Network Access` is set to `Enabled from all networks` for the Storage Account.

## References

1. <https://learn.microsoft.com/en-us/azure/storage/blobs/anonymous-read-access-configure>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-governance-strategy#gs-2-define-and-implement-enterprise-segmentationseparation-of-duties-strategy>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-network-security#ns-2-secure-cloud-native-services-with-network-controls>
4. <https://learn.microsoft.com/en-us/azure/storage/blobs/assign-azure-role-data-access>
5. <https://learn.microsoft.com/en-us/azure/storage/common/storage-network-security>

## Additional Information

This recommendation is based on the Common Reference Recommendation `Ensure public network access is Disabled`, from the `Common Reference Recommendations > Networking > Virtual Networks (VNets)` section.
