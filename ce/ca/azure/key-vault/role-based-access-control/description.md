# Description

The recommended way to access Key Vaults is to use the Azure Role-Based Access Control (RBAC) permissions model.

Azure RBAC is an authorization system built on Azure Resource Manager that provides fine-grained access management of Azure resources. It allows users to manage key, secret, and certificate permissions. This provides one place to manage permissions across all Key Vaults.

## Rationale

The RBAC permissions model for Key Vaults enables much finer-grained access control for secrets, keys, certificates, and more than the vault access policy. This permits the use of privileged identity management over these roles, securing Key Vaults with JIT access management.

## Impact

Implementation needs to be properly designed from the ground up, as this is a fundamental change to the way Key Vaults are accessed and managed. Changing permissions can result in service disruption while permissions are re-applied. To minimize downtime, map current groups and users to their corresponding permission needs.

## Audit

This policy flags an *Azure Key Vault* as `INCOMPLIANT` if `RBAC Authorization` is set to **Disabled**.

## Default Value

The default value for access control in Key Vaults is Vault Policy.

## References

1. <https://docs.microsoft.com/en-gb/azure/key-vault/general/rbac-migration#vault-access-policy-to-azure-rbac-migration-steps>
2. <https://docs.microsoft.com/en-gb/azure/role-based-access-control/role-assignments-portal?tabs=current>
3. <https://docs.microsoft.com/en-gb/azure/role-based-access-control/overview>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-data-protection#dp-8-ensure-security-of-key-and-certificate-repository>
