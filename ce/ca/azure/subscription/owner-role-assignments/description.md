# Description

The Owner role in Azure grants full control over all resources in a subscription, including the ability to assign roles to others.

## Rationale

Limit the number of security principals (users, groups, service principals, and managed identities) assigned the Owner role to between 2 and 3. If groups are used, ensure their membership is tightly controlled and regularly reviewed to avoid privilege sprawl.

## Impact

Implementation may require changes in administrative workflows or the redistribution of roles and responsibilities. The recommendation to have between 2 and 3 Owners per subscription must account for all security principals that can be assigned the Owner role, not just individual users. This includes:

- User accounts
- Entra ID groups
- Service principals (used by applications or automation)
- Managed identities (system-assigned or user-assigned)

## Audit

This policy marks an `Owner` *Azure Authorization Role* as `INCOMPLIANT` if the role has fewer than 2 or more that 3 related *Azure Authorization Role Assignments*.

This policy marks an `Owner` *Azure Authorization Role* as `UNDETERMINED` if the role has a related assignment to *Azure Active Directory Group*. Check number of group members manually.

## Default Value

A subscription has 1 owner by default.

## References

1. <https://learn.microsoft.com/en-us/cli/azure/role/assignment>
2. <https://learn.microsoft.com/en-us/powershell/module/az.resources/get-azroleassignment>
3. <https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/privileged#owner>
4. <https://learn.microsoft.com/en-us/azure/role-based-access-control/role-assignments-portal-subscription-admin>
