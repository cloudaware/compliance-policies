# Description

Require administrators or appropriately delegated users to create new tenants.

## Rationale

It is recommended to only allow an administrator to create new tenants. This prevent users from creating new Microsoft Entra ID or Azure AD B2C tenants and ensures that only authorized users are able to do so.

## Impact

Enforcing this setting will ensure that only authorized users are able to create new tenants.

## Audit

### From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Entra ID`.
3. Under `Manage`, select `Users`.
4. Under `Manage`, select `User settings`.
5. Ensure that `Restrict non-admin users from creating tenants` is set to `Yes`.

### From PowerShell

```ps
Import-Module Microsoft.Graph.Identity.SignIns Connect-MgGraph -Scopes 'Policy.ReadWrite.Authorization' Get-MgPolicyAuthorizationPolicy | Select-Object -ExpandProperty DefaultUserRolePermissions | Format-List
```

Review the `DefaultUserRolePermissions` section of the output. Ensure that `AllowedToCreateTenants` is not `True`.

## References

1. <https://learn.microsoft.com/en-us/azure/active-directory/fundamentals/users-default-permissions>
2. <https://learn.microsoft.com/en-us/azure/active-directory/roles/permissions-reference#tenant-creator>
3. <https://blog.admindroid.com/disable-users-creating-new-azure-ad-tenants-in-microsoft-365/>
