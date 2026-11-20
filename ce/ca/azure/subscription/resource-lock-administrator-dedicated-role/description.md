# Description

A dedicated lock administrator can manage resource locks without the broader Owner or User Access Administrator role. Use the built-in **Locks Contributor** role or a custom role limited to managing resource locks.

## Audit

Manual assessment is required. At every applicable subscription or resource-group scope, review inherited and direct assignments of **Locks Contributor** and qualifying custom roles. A custom role must grant `Microsoft.Authorization/locks/*` or both `Microsoft.Authorization/locks/write` and `Microsoft.Authorization/locks/delete`, with no broader administration rights. Check NotActions and assignment conditions as well as Actions. Confirm that appropriate designated administrators hold the role at the intended scope. Role existence alone does not establish assignment or organizational appropriateness.

## References

1. <https://learn.microsoft.com/en-us/azure/role-based-access-control/custom-roles>
2. <https://learn.microsoft.com/en-us/azure/role-based-access-control/check-access>
