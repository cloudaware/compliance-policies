# Description

Ensure that the number of days before users are asked to re-confirm their authentication information is not set to 0.

## Rationale

This setting is necessary if you have setup 'Require users to register when signing in option'. If authentication re-confirmation is disabled, registered users will never be prompted to re-confirm their existing authentication information. If the authentication information for a user changes, such as a phone number or email, then the password reset information for that user reverts to the previously registered authentication information.

## Impact

Users will be prompted for their multifactor authentication at the duration set here.

## Audit

### From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Entra ID`.
3. Under `Manage`, select `Users`.
4. Under `Manage`, select `Password reset`.
5. Under `Manage`, select `Registration`.
6. Ensure that `Number of days before users are asked to re-confirm their authentication information` is not set to `0`.

## Default Value

By default, the `Number of days before users are asked to re-confirm their authentication information` is set to `180 days`.

## References

1. <https://learn.microsoft.com/en-us/entra/identity/authentication/concept-sspr-howitworks#registration>
2. <https://support.microsoft.com/en-us/account-billing/reset-your-work-or-school-password-using-security-info-23dde81f-08bb-4776-ba72-e6b72b9dda9e>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-governance-strategy#gs-6-define-and-implement-identity-and-privileged-access-strategy>
4. <https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-methods>
