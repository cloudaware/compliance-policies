# Description

Disallowing public network access for a storage account overrides the public access settings for individual containers in that storage account for Azure Resource Manager Deployment Model storage accounts. Azure Storage accounts that use the classic deployment model will be retired on August 31, 2024.

## Rationale

Disabling public network access improves security by ensuring that a storage account is not exposed on the public internet. Selected networks and trusted-service exceptions still leave public network access enabled and do not satisfy this control.

The default network configuration for a storage account permits a user with appropriate permissions to configure public network access to containers and blobs in a storage account. Keep in mind that public access to a container is always turned off by default and must be explicitly configured to permit anonymous requests. It grants read-only access to these resources without sharing the account key, and without requiring a shared access signature. It is recommended not to provide public network access to storage accounts until, and unless, it is strongly desired. A shared access signature token or Azure AD RBAC should be used for providing controlled and timed access to blob containers.

## Impact

**NOTE:** Prior to disabling public network access, it is strongly recommended that, for each storage account, either:

- virtual network integration is completed
OR
- private endpoints/links are set up as described in **"Ensure Private Endpoints are used to access Storage Accounts."**

Disabling public network access restricts direct access to the service. This enhances security but will require the configuration of a virtual network and/or private endpoints for any services or users needing access within trusted networks.

Access will have to be managed using shared access signatures or via Azure AD RBAC.

## Audit

This policy marks an *Azure Storage Account* as `INCOMPLIANT` unless `Public Network Access State` is **Disabled**, for all recognized settings. An unset value uses the native **Enabled** default. **Enabled**, including selected networks with the **AzureServices** exception, and **SecuredByPerimeter** do not satisfy this control.

**Disabled** is `COMPLIANT`. The separate default-network and trusted-services policies assess their own requirements.

## Default Value

By default, `Public Network Access` is set to `Enabled from all networks` for the Storage Account.
