# Description

Microsoft Azure provides a Global Banned Password policy that applies to Azure administrative and normal user accounts. This is not applied to user accounts that are synced from an on-premise Active Directory unless Microsoft Entra ID Connect is used and you enable EnforceCloudPasswordPolicyForPasswordSyncedUsers. Please see the list in default values on the specifics of this policy. To further password security, it is recommended to further define a custom banned password policy.

## Rationale

Enabling this gives your organization further customization on what secure passwords are allowed. Setting a bad password list enables your organization to fine-tune its password policy further, depending on your needs. Removing easy-to-guess passwords increases the security of access to your Azure resources.

## Impact

Increasing needed password complexity might increase overhead on administration of user accounts. Licensing requirement for Global Banned Password List and Custom Banned Password list requires Microsoft Entra ID P1 or P2. On-premises Active Directory Domain Services users that are not synchronized to Microsoft Entra ID also benefit from Microsoft Entra ID Password Protection based on existing licensing for synchronized users.

## Audit

### From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Entra ID`.
3. Select `Security`.
4. Under `Manage`, select `Authentication Methods`.
5. Select `Password Protection`.
6. Ensure `Enforce custom list` is set to `Yes`.
7. Scroll through the list to view the enforced passwords.

## Default Value

By default the custom bad password list is not `Enabled`. Organizational-specific terms can be added to the custom banned password list, such as the following examples:

- Brand names
- Product names
- Locations, such as company headquarters
- Company-specific internal terms
- Abbreviations that have specific company meaning
- Months and weekdays with your company's local languages

The default Azure bad password policy is already applied to your resources which applies the following basic requirements:

### Characters allowed

- Uppercase characters (A - Z)
- Lowercase characters (a - z)
- Numbers (0 - 9)
- Symbols:
- @ # $ % ^ & * - _ ! + = [ ] { } | \ : ' , . ? / ` ~ " ( ) ; < >
- blank space

### Characters not allowed

- Unicode characters
- Password length Passwords require
- A minimum of eight characters
- A maximum of 256 characters

### Password complexity

Passwords require three out of four of the following categories:

- Uppercase characters
- Lowercase characters
- Numbers
- Symbols Note: Password complexity check isn't required for Education tenants.

### Password not recently used

- When a user changes or resets their password, the new password can't be the same as the current or recently used passwords.
- Password isn't banned by Entra ID Password Protection.
- The password can't be on the global list of banned passwords for Azure AD Password Protection, or on the customizable list of banned passwords specific to your organization.

## References

1. <https://learn.microsoft.com/en-us/entra/identity/authentication/concept-password-ban-bad-combined-policy>
2. <https://learn.microsoft.com/en-us/entra/identity/authentication/concept-password-ban-bad>
3. <https://docs.microsoft.com/en-us/powershell/module/Azuread/>
4. <https://www.microsoft.com/en-us/research/publication/password-guidance/>
5. <https://learn.microsoft.com/en-us/entra/identity/authentication/tutorial-configure-custom-password-protection>
6. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-identity-management#im-6-use-strong-authentication-controls>
