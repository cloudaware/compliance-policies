# Description

Limit guest user permissions.

## Rationale

Limiting guest access ensures that guest accounts do not have permission for certain directory tasks, such as enumerating users, groups or other directory resources, and cannot be assigned to administrative roles in your directory. Guest access has three levels of restriction.

1. Guest users have the same access as members (most inclusive).
2. Guest users have limited access to properties and memberships of directory objects (default value).
3. Guest user access is restricted to properties and memberships of their own directory objects (most restrictive).

The recommended option is the 3rd, most restrictive: "Guest user access is restricted to their own directory object".

## Impact

This may create additional requests for permissions to access resources that administrators will need to approve.

According to <https://learn.microsoft.com/en-us/azure/active-directory/enterprise-users/users-restrict-guest-permissions#services-currently-not-supported>

Service without current support might have compatibility issues with the new guest restriction setting.

- Forms
- Project
- Yammer
- Planner in SharePoint

## Audit

### From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Entra ID`.
3. Then `External Identities`.
4. Select `External collaboration settings`.
5. Under `Guest user access`, ensure that `Guest user access restrictions` is set to `Guest user access is restricted to properties and memberships of their own directory objects`.

### From PowerShell

1. Enter the following:

```ps
Get-AzureADMSAuthorizationPolicy
```

Which will give a result like:

```
Id : authorizationPolicy 
OdataType : 
Description : Used to manage authorization related settings across the company. 
DisplayName : Authorization Policy 
EnabledPreviewFeatures : {} 
GuestUserRoleId : 10dae51f-b6af-4016-8d66-8c2a99b929b3 
PermissionGrantPolicyIdsAssignedToDefaultUserRole : {user-default-legacy}
```

If the `GuestUserRoleID` property does not equal `2af84b1e-32c8-42b7-82bc-daa82404023b` then it is not set to most restrictive.

## Default Value

By default, `Guest user access restrictions` is set to `Guest users have limited access to properties and memberships of directory objects`.

## References

1. <https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/users-default-permissions#member-and-guest-users>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-privileged-access#pa-3-manage-lifecycle-of-identities-and-entitlements>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-governance-strategy#gs-2-define-and-implement-enterprise-segmentationseparation-of-duties-strategy>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-governance-strategy#gs-6-define-and-implement-identity-and-privileged-access-strategy>
5. <https://docs.microsoft.com/en-us/azure/active-directory/enterprise-users/users-restrict-guest-permissions>
