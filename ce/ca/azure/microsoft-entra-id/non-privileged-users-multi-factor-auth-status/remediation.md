# Remediation

## From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Entra ID` blade.
3. Select `Users`.
4. Take note of all users with the role `Service Co-Administrators`, `Owners` or `Contributors`.
5. Click on the `Per-User MFA` button in the top row menu.
6. Check the box next to each noted user.
7. Click `Enable` under quick steps in the right-hand panel.
8. Click `enable multi-factor auth`.
9. Click `close`.

## Other Options within Azure Portal

Follow Microsoft Azure documentation and enable multi-factor authentication in your environment.

- <https://docs.microsoft.com/en-us/azure/active-directory/authentication/tutorial-enable-azure-mfa>

Enabling and configuring MFA is a multi-step process. Here are some additional resources on the process within Microsoft Entra ID:

- <https://learn.microsoft.com/en-us/entra/identity/conditional-access/howto-conditional-access-policy-admin-mfa>
- <https://learn.microsoft.com/en-us/entra/identity/authentication/howto-mfa-getstarted#enable-multi-factor-authentication-with-conditional-access>
- <https://learn.microsoft.com/en-us/entra/identity/authentication/howto-mfa-mfasettings>
