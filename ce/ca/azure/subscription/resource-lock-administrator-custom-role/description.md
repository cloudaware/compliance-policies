# Description

Resource locking is a powerful protection mechanism that can prevent inadvertent modification/deletion of resources within Azure subscriptions/Resource Groups and is a recommended NIST configuration.

## Rationale

Given the resource lock functionality is outside of standard Role Based Access Control(RBAC),s it would be prudent to create a resource lock administrator role to prevent inadvertent unlocking of resources.

## Impact

By adding this role, specific permissions may be granted for managing just resource locks rather than needing to provide the wide Owner or User Access Administrator role, reducing the risk of the user being able to do unintentional damage.

## Audit

### From Azure Portal

1. In the Azure portal, open a subscription or resource group where you want to view assigned roles.
2. Select `Access control (IAM)`.
3. Select `Roles`.
4. Search for the custom role named "role_name" e.g. from remediation `Resource Lock Administrator`.
5. Ensure that the role is assigned to the appropriate users.

## References

1. <https://docs.microsoft.com/en-us/azure/role-based-access-control/custom-roles>
2. <https://docs.microsoft.com/en-us/azure/role-based-access-control/check-access>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-privileged-access#pa-1-separate-and-limit-highly-privilegedadministrative-users>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-privileged-access#pa-7-follow-just-enough-administration-least-privilege-principle>
5. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-privileged-access#pa-3-manage-lifecycle-of-identities-and-entitlements>
6. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-governance-strategy#gs-2-define-and-implement-enterprise-segmentationseparation-of-duties-strategy>
7. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-governance-strategy#gs-6-define-and-implement-identity-and-privileged-access-strategy>
