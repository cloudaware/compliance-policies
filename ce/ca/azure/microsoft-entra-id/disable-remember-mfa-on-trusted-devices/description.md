# Description

**[IMPORTANT - Please read the section overview**: If your organization pays for Microsoft Entra ID licensing (included in Microsoft 365 E3, E5, or F5, and EM&S E3 or E5 licenses) and **CAN** use Conditional Access, ignore the recommendations in this section and proceed to the Conditional Access section.]

Do not allow users to remember multi-factor authentication on devices.

## Rationale

Remembering Multi-Factor Authentication (MFA) for devices and browsers allows users to have the option to bypass MFA for a set number of days after performing a successful sign-in using MFA. This can enhance usability by minimizing the number of times a user may need to perform two-step verification on the same device. However, if an account or device is compromised, remembering MFA for trusted devices may affect security. Hence, it is recommended that users not be allowed to bypass MFA.

## Impact

For every login attempt, the user will be required to perform multi-factor authentication.

## Audit

### From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Entra ID`.
3. Under `Manage`, click `Users`.
4. Click the `Per-user MFA` button on the top bar.
5. Click on `Service settings`.
6. Ensure that `Allow users to remember multi-factor authentication on devices they trust` is not enabled.

## Default Value

By default, `Allow users to remember multi-factor authentication on devices they trust` is disabled.

## References

1. <https://learn.microsoft.com/en-us/entra/identity/authentication/howto-mfa-mfasettings#remember-multi-factor-authentication-for-devices-that-users-trust>
2. <https://docs.microsoft.com/en-us/security/benchmark/azure/security-controls-v3-identity-management#im-4-use-strong-authentication-controls-for-all-azure-active-directory-based-access>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-identity-management#im-6-use-strong-authentication-controls>
