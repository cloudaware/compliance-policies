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
- **Policy ID**: [0b15565f-aa9e-48ba-8619-45960f2c314d](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F0b15565f-aa9e-48ba-8619-45960f2c314d) - **Name**: `Email notification to subscription owner for high severity alerts should be enabled`

## Default Value

By default, `Notify about alerts with the following severity (or higher)` is set to `High`.

## References

1. <https://learn.microsoft.com/en-us/azure/defender-for-cloud/configure-email-notifications>
2. <https://learn.microsoft.com/en-us/rest/api/defenderforcloud/security-contacts>
3. <https://learn.microsoft.com/en-us/rest/api/defenderforcloud/security-contacts/list>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-incident-response#ir-2-preparation---setup-incident-notification>

## Additional Information

Excluding any entries in the `input.json` properties block disables the specific setting by default. This recommendation has been updated to reflect recent changes to Microsoft REST APIs for getting and updating security contact information.
