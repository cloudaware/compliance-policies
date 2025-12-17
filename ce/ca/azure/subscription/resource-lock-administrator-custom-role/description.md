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
4. Click `Type : All`.
5. Click to view the drop-down menu.
6. Select `Custom role`.
7. Click `View` in the `Details` column of a custom role.
8. Review the role permissions.
9. Click `Assignments` and review the assignments.
10. Click the `X` to exit the custom role details page.
11. Repeat steps 7-10. Ensure that at least one custom role exists that assigns the `Microsoft.Authorization/locks` permission to appropriate members.
12. Repeat steps 1-11 for each subscription or resource group.

## References

1. <https://learn.microsoft.com/en-us/azure/role-based-access-control/custom-roles>
2. <https://learn.microsoft.com/en-us/azure/role-based-access-control/check-access>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-privileged-access#pa-1-separate-and-limit-highly-privilegedadministrative-users>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-privileged-access#pa-7-follow-just-enough-administration-least-privilege-principle>
5. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-privileged-access#pa-3-manage-lifecycle-of-identities-and-entitlements>
6. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-governance-strategy#gs-2-define-and-implement-enterprise-segmentationseparation-of-duties-strategy>
7. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-governance-strategy#gs-6-define-and-implement-identity-and-privileged-access-strategy>
