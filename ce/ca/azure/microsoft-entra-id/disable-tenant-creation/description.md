# Description

Require administrators or appropriately delegated users to create new tenants.

## Rationale

It is recommended to only allow an administrator to create new tenants. This prevent users from creating new Microsoft Entra ID or Azure AD B2C tenants and ensures that only authorized users are able to do so.

## Impact

Enforcing this setting will ensure that only authorized users are able to create new tenants.

## Audit

This policy marks an *Azure Active Directory* as `INCOMPLIANT` if the related *Active Directory Auth Policy* has `Default Permission: Create Tenants` set to **Enabled**. This field corresponds to the `Restrict non-admin users from creating tenants` setting in the Microsoft Entra admin center’s **User settings** when enabled (set to **Yes**).

## References

1. <https://learn.microsoft.com/en-us/azure/active-directory/fundamentals/users-default-permissions>
2. <https://learn.microsoft.com/en-us/azure/active-directory/roles/permissions-reference#tenant-creator>
3. <https://blog.admindroid.com/disable-users-creating-new-azure-ad-tenants-in-microsoft-365/>
