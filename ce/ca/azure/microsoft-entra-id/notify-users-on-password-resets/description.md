# Description

Ensure that users are notified on their primary and secondary emails on password resets.

## Rationale

User notification on password reset is a proactive way of confirming password reset activity. It helps the user to recognize unauthorized password reset activities.

## Impact

Users will receive emails alerting them to password changes to both their primary and secondary emails.

## Audit

### From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Entra ID`.
3. Select `Users`.
4. Go to `Password reset`.
5. Under Manage, select `Notifications`.
6. Ensure that `Notify users on password resets?` is set to `Yes`.

## Default Value

By default, `Notify users on password resets?` is set to `Yes`.

## References

1. <https://docs.microsoft.com/en-us/azure/active-directory/authentication/tutorial-enable-sspr#set-up-notifications-and-customizations>
2. <https://docs.microsoft.com/en-us/azure/active-directory/active-directory-passwords-how-it-works#notifications>
3. <https://docs.microsoft.com/en-us/azure/active-directory/authentication/howto-sspr-deployment>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-governance-strategy#gs-6-define-and-implement-identity-and-privileged-access-strategy>
