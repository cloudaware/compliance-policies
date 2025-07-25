# Description

Enables emailing security alerts to the subscription owner or other designated security contact.

## Rationale

Enabling security alert emails ensures that security alert emails are received from Microsoft. This ensures that the right people are aware of any potential security issues and are able to mitigate the risk.

## Impact

Enabling security alert emails can cause alert fatigue, increasing the risk of missing important alerts. Select an appropriate severity level to manage notifications. Azure aims to reduce alert fatigue by limiting the daily email volume per severity level. Learn more: <https://learn.microsoft.com/en-us/azure/defender-for-cloud/configure-email-notifications#email-frequency>.

## Audit

This policy flags an *Azure Subscription* as `INCOMPLIANT` if the `Security Center: Contacts` configuration does **not** include a **default** contact where `alertNotifications` is set to **On** and `alertNotificationsMinimalSeverity` is set to **High** or **Critical**.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [6e2593d9-add6-4083-9c9b-4b7d2188c899](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F6e2593d9-add6-4083-9c9b-4b7d2188c899) - **Name**: `Email notification for high severity alerts should be enabled`

## Default Value

By default, `Notify about alerts with the following severity (or higher)` is set to `High`.

## References

1. <https://docs.microsoft.com/en-us/azure/security-center/security-center-provide-security-contact-details>
2. <https://docs.microsoft.com/en-us/rest/api/securitycenter/securitycontacts/list>
3. <https://docs.microsoft.com/en-us/rest/api/securitycenter/security-contacts>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-incident-response#ir-2-preparation---setup-incident-notification>

## Additional Information

Excluding any entries in the input.json properties block disables the specific setting by default. This recommendation has been updated to reflect recent changes to Microsoft REST APIs for getting and updating security contact information.
