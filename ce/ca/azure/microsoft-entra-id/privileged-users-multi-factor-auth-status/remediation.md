# Remediation

## From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Entra` ID blade.
3. Under `Manage`, click `Roles and administrators`.
4. Take note of all users with the role `Service Co-Administrators`, `Owners` or `Contributors`.
5. Return to the `Overview`.
6. Under `Manage`, click `Users`.
7. Click on the `Per-User MFA` button in the top row menu.
8. Check the box next to each noted user.
9. Click `Enable MFA`.
10. Click `Enable`.

## Other Options within Azure Portal

Follow Microsoft Azure documentation and enable multi-factor authentication in your environment.

- <https://docs.microsoft.com/en-us/azure/active-directory/authentication/tutorial-enable-azure-mfa>

Enabling and configuring MFA with conditional access policy is a multi-step process. Here are some additional resources on the process within Entra ID to enable multi-factor authentication for users within your subscriptions with conditional access policy.

- <https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/howto-conditional-access-policy-admin-mfa>
- <https://docs.microsoft.com/en-us/azure/active-directory/authentication/howto-mfa-getstarted#enable-multi-factor-authentication-with-conditional-access>
- <https://docs.microsoft.com/en-us/azure/active-directory/authentication/howto-mfa-mfasettings>
