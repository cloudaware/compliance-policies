# Description

Ensures that two alternate forms of identification are provided before allowing a password reset.

## Rationale

A Self-service Password Reset (SSPR) through Azure Multi-factor Authentication (MFA) ensures the user's identity is confirmed using two separate methods of identification. With multiple methods set, an attacker would have to compromise both methods before they could maliciously reset a user's password.

## Impact

There may be administrative overhead, as users who lose access to their secondary authentication methods will need an administrator with permissions to remove it. There will also need to be organization-wide security policies and training to teach administrators to verify the identity of the requesting user so that social engineering can not render this setting useless.

## Audit

### From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Entra ID`.
3. Under `Manage`, select `Users`.
4. Under `Manage`, select `Password reset`.
5. Select `Authentication methods`.
6. Ensure that `Number of methods required to reset` is set to `2`.

## Default Value

By default, the `Number of methods required to reset` is set to `2`.

## References

1. <https://learn.microsoft.com/en-us/entra/identity/authentication/tutorial-enable-sspr>
2. <https://learn.microsoft.com/en-us/entra/identity/authentication/concept-registration-mfa-sspr-combined>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-identity-management#im-6-use-strong-authentication-controls>
4. <https://learn.microsoft.com/en-us/entra/identity/authentication/passwords-faq#password-reset-registration>
5. <https://support.microsoft.com/en-us/account-billing/reset-your-work-or-school-password-using-security-info-23dde81f-08bb-4776-ba72-e6b72b9dda9e>
6. <https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-methods>
