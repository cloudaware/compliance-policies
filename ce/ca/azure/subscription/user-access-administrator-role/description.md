# Description

The User Access Administrator role grants the ability to view all resources and manage access assignments at any subscription or management group level within the tenant. Due to its high privilege level, this role assignment should be removed immediately after completing the necessary changes at the root scope to minimize security risks.

## Rationale

The User Access Administrator role provides extensive access control privileges. Unnecessary assignments heighten the risk of privilege escalation and unauthorized access. Removing the role immediately after use minimizes security exposure.

## Impact

Increased administrative effort to manage and remove role assignments appropriately.

## Audit

This policy marks a `User Access Administrator` *Azure Authorization Role* as `INCOMPLIANT` if the role has any related *Azure Authorization Role Assignments*.

## References

1. <https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles>
2. <https://learn.microsoft.com/en-us/azure/role-based-access-control/elevate-access-global-admin>
