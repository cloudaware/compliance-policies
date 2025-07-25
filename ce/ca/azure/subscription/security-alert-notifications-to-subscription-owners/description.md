# Description

Enable security alert emails to subscription owners.

## Rationale

Enabling security alert emails to subscription owners ensures that they receive security alert emails from Microsoft. This ensures that they are aware of any potential security issues and can mitigate the risk in a timely fashion.

## Audit

This policy flags an *Azure Subscription* as `INCOMPLIANT` if the `Security Center: Contacts` configuration does **not** include a **default** contact where `notificationsByRoleRoles` contains the **Owner** role and `notificationsByRoleState` is set to **On**.

## Default Value

By default, `Owner` is selected.

## References

1. <https://docs.microsoft.com/en-us/azure/security-center/security-center-provide-security-contact-details>
2. <https://docs.microsoft.com/en-us/rest/api/securitycenter/securitycontacts/list>
3. <https://docs.microsoft.com/en-us/rest/api/securitycenter/security-contacts>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-incident-response#ir-2-preparation---setup-incident-notification>

## Additional Information

Excluding any entries in the `input.json` properties block disables the specific setting by default.
