# Description

**[IMPORTANT - Please read the section overview**: If your organization pays for Microsoft Entra ID licensing (included in Microsoft 365 E3, E5, or F5, and EM&S E3 or E5 licenses) and **CAN** use Conditional Access, ignore the recommendations in this section and proceed to the Conditional Access section.]

Security defaults in Microsoft Entra ID make it easier to be secure and help protect your organization. Security defaults contain preconfigured security settings for common attacks.

Security defaults is available to everyone. The goal is to ensure that all organizations have a basic level of security enabled at no extra cost. You may turn on security defaults in the Azure portal.

## Rationale

Security defaults provide secure default settings that we manage on behalf of organizations to keep customers safe until they are ready to manage their own identity security settings.

For example, doing the following:

- Requiring all users and admins to register for MFA.
- Challenging users with MFA - when necessary, based on factors such as location, device, role, and task.
- Disabling authentication from legacy authentication clients, which can’t do MFA.

## Impact

This recommendation should be implemented initially and then may be overridden by other service/product specific CIS Benchmarks. Administrators should also be aware that certain configurations in Microsoft Entra ID may impact other Microsoft services such as Microsoft 365.

## Audit

### From Azure Portal

To ensure security defaults is enabled in your directory:

1. From Azure Home select the Portal Menu.
2. Browse to `Microsoft Entra ID` > `Properties`.
3. Select `Manage security defaults`.
4. Under `Security defaults`, verify that `Enabled (recommended)` is selected.

## Default Value

If your tenant was created on or after October 22, 2019, security defaults may already be enabled in your tenant.

## References

1. <https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/concept-fundamentals-security-defaults>
2. <https://techcommunity.microsoft.com/t5/azure-active-directory-identity/introducing-security-defaults/ba-p/1061414>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-identity-management#im-2-protect-identity-and-authentication-systems>

## Additional Information

This recommendation differs from the Microsoft 365 Benchmark. This is because the potential impact associated with disabling Security Defaults is dependent upon the security settings implemented in the environment. It is recommended that organizations disabling Security Defaults implement appropriate security settings to replace the settings configured by Security Defaults.
