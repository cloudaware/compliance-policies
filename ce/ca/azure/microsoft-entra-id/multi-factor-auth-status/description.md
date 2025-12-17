# Description

**[IMPORTANT - Please read the section overview:** If your organization pays for Microsoft Entra ID licensing (included in Microsoft 365 E3, E5, F5, or Business Premium, and EM&S E3 or E5 licenses) and **CAN** use Conditional Access, ignore the recommendations in this section and proceed to the Conditional Access section.**]**

Enable multifactor authentication for all users.

**Note:** Since 2024, Azure has been rolling out mandatory multifactor authentication. For more information:

- <https://azure.microsoft.com/en-us/blog/announcing-mandatory-multi-factor-authentication-for-azure-sign-in>
- <https://learn.microsoft.com/en-us/entra/identity/authentication/concept-mandatory-multifactor-authentication>

## Rationale

Multifactor authentication requires an individual to present a minimum of two separate forms of authentication before access is granted. Multifactor authentication provides additional assurance that the individual attempting to gain access is who they claim to be. With multifactor authentication, an attacker would need to compromise at least two different authentication mechanisms, increasing the difficulty of compromise and thus reducing the risk.

## Impact

Users would require two forms of authentication before any access is granted. Additional administrative time will be required for managing dual forms of authentication when enabling multifactor authentication.

## Audit

This policy flags an *Azure Active Directory User* as `INCOMPLIANT` if the `MFA State` is **Disabled** or empty.

## Default Value

Multifactor authentication is not enabled for all users by default. Starting in 2024, multifactor authentication is enabled for administrative accounts by default.

## References

1. <https://learn.microsoft.com/en-us/entra/identity/authentication/concept-mfa-howitworks>
2. <https://learn.microsoft.com/en-us/entra/identity/authentication/concept-mandatory-multifactor-authentication>
3. <https://azure.microsoft.com/en-us/blog/announcing-mandatory-multi-factor-authentication-for-azure-sign-in/>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-identity-management#im-4-authenticate-server-and-services>
