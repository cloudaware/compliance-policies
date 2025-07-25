# Description

The recommended way to access Key Vaults is to use the Azure Role-Based Access Control (RBAC) permissions model.

Azure RBAC is an authorization system built on Azure Resource Manager that provides fine-grained access management of Azure resources. It allows users to manage Key, Secret, and Certificate permissions. It provides one place to manage all permissions across all key vaults.

## Rationale

The new RBAC permissions model for Key Vaults enables a much finer grained access control for key vault secrets, keys, certificates, etc., than the vault access policy. This in turn will permit the use of privileged identity management over these roles, thus securing the key vaults with JIT Access management.

## Impact

Implementation needs to be properly designed from the ground up, as this is a fundamental change to the way key vaults are accessed/managed. Changing permissions to key vaults will result in loss of service as permissions are re-applied. For the least amount of downtime, map your current groups and users to their corresponding permission needs.

## Audit

This policy flags an *Azure Key Vault* as `INCOMPLIANT` if `RBAC Authorization` is set to **Disabled**.

## Default Value

The default value for Access control in Key Vaults is Vault Policy.

## References

1. <https://docs.microsoft.com/en-gb/azure/key-vault/general/rbac-migration#vault-access-policy-to-azure-rbac-migration-steps>
2. <https://docs.microsoft.com/en-gb/azure/role-based-access-control/role-assignments-portal?tabs=current>
3. <https://docs.microsoft.com/en-gb/azure/role-based-access-control/overview>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-data-protection#dp-8-ensure-security-of-key-and-certificate-repository>
