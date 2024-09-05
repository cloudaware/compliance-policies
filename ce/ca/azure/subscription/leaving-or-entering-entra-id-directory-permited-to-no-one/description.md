# Description

Users who are set as subscription owners are able to make administrative changes to the subscriptions and move them into and out of Microsoft Entra ID.

## Rationale

Permissions to move subscriptions in and out of Microsoft Entra ID directory must only be given to appropriate administrative personnel. A subscription that is moved into an Microsoft Entra ID directory may be within a folder to which other users have elevated permissions. This prevents loss of data or unapproved changes of the objects within by potential bad actors.

## Impact

Subscriptions will need to have these settings turned off to be moved.

## Audit

### From Azure Portal

1. From the Azure Portal Home select the portal menu.
2. Select `Subscriptions`.
3. In the `Advanced options` drop-down menu, select `Manage Policies`.
4. Ensure `Subscription leaving Microsoft Entra ID directory` and `Subscription entering Microsoft Entra ID directory` are set to `Permit no one`.

## Default Value

By default `Subscription leaving Microsoft Entra ID directory` and `Subscription entering Microsoft Entra ID directory` are set to `Allow everyone (default)`.

## References

1. <https://docs.microsoft.com/en-us/azure/cost-management-billing/manage/manage-azure-subscription-policy>
2. <https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-how-subscriptions-associated-directory>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-identity-management#im-2-protect-identity-and-authentication-systems>
