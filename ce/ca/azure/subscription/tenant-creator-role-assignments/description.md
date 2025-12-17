# Description

Perform a periodic review of the Tenant Creator role assignment to ensure that the assignments are accurate and appropriate.

## Rationale

Unnecessary assignments increase the risk of privilege escalation and unauthorized access.

## Impact

Verify that the Tenant Creator role is no longer required by any assignments before removal to avoid disruption of critical functions.

## Audit

### From Azure Portal

1. Go to `Microsoft Entra ID`.
2. Under `Manage`, click `Roles and administrators`.
3. In the search bar, type `Tenant Creator`.
4. Click the role.
5. Review the assignments and ensure that they are appropriate.

## Default Value

The Tenant Creator role is not assigned by default.

## References

1. <https://learn.microsoft.com/en-us/azure/active-directory-b2c/tenant-management-check-tenant-creation-permission>
2. <https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#tenant-creator>
