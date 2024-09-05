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
3. Then `Users`.
4. Select `Password reset`.
5. Then `Authentication methods`.
6. Ensure that `Number of methods required to reset` is set to `2`.

## Default Value

By default, the `Number of methods required to reset` is set to `2`.

## References

1. <https://docs.microsoft.com/en-us/azure/active-directory/authentication/tutorial-enable-sspr>
2. <https://docs.microsoft.com/en-us/azure/active-directory/authentication/concept-registration-mfa-sspr-combined>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-identity-management#im-6-use-strong-authentication-controls>
4. <https://docs.microsoft.com/en-us/azure/active-directory/active-directory-passwords-faq#password-reset-registration>
5. <https://docs.microsoft.com/en-us/azure/active-directory/authentication/howto-sspr-deployment>
6. <https://docs.microsoft.com/en-us/azure/active-directory/authentication/concept-authentication-methods>
