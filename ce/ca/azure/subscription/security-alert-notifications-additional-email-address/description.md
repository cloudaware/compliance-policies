# Description

Microsoft Defender for Cloud emails the subscription owners whenever a high-severity alert is triggered for their subscription. You should provide a security contact email address as an additional email address.

## Rationale

Microsoft Defender for Cloud emails the Subscription Owner to notify them about security alerts. Adding your Security Contact's email address to the 'Additional email addresses' field ensures that your organization's Security Team is included in these alerts. This ensures that the proper people are aware of any potential compromise in order to mitigate the risk in a timely fashion.

## Audit

This policy flags an *Azure Subscription* as `INCOMPLIANT` if the `Security Center: Contacts` configuration does **not** include a **default** contact with a configured `security contact email`.

## Default Value

By default, there are no additional email addresses entered.

## References

1. <https://learn.microsoft.com/en-us/azure/defender-for-cloud/configure-email-notifications>
2. <https://learn.microsoft.com/en-us/rest/api/defenderforcloud/security-contacts/list>
3. <https://learn.microsoft.com/en-us/rest/api/defenderforcloud/security-contacts>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-incident-response#ir-2-preparation---setup-incident-notification>

## Additional Information

Excluding any entries in the `input.json` properties block disables the specific setting by default.
