# Description

Enables emailing attack paths to the subscription owner or other designated security contact.

## Rationale

Enabling attack path emails ensures that attack path emails are sent by Microsoft. This ensures that the right people are aware of any potential security issues and can mitigate the risk.

## Impact

Enabling attack path emails can cause alert fatigue, increasing the risk of missing important alerts. Select an appropriate risk level to manage notifications. Azure aims to reduce alert fatigue by limiting the daily email volume per risk level. Learn more: <https://learn.microsoft.com/en-us/azure/defender-for-cloud/configure-email-notifications#email-frequency>.

## Audit

### From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Defender for Cloud`.
3. Under `Management`, select `Environment settings`.
4. Click on the appropriate Subscription.
5. Click on `Email notifications`.
6. Under Notification types, ensure that the box next to `Notify about attack paths with the following risk level (or higher)` is checked, and an appropriate risk level is selected.
7. Repeat steps 1-6 for each Subscription.

### From Azure CLI

Including a Subscription ID at the `$0` in `/subscriptions/$0/providers`, ensure the below command returns `"sourceType": "AttackPath"`, and that `"minimalRiskLevel"` is set to an appropriate risk level:

```sh
az account get-access-token --query "{subscription:subscription,accessToken:accessToken}" --out tsv | xargs -L1 bash -c 'curl -X GET -H "Authorization: Bearer $1" -H "Content-Type: application/json" https://management.azure.com/subscriptions/$0/providers/Microsoft.Security/securityContacts?api-version=2023-12-01-preview' | jq '.|.[]'
```

## References

1. <https://learn.microsoft.com/en-us/azure/defender-for-cloud/configure-email-notifications>
2. <https://learn.microsoft.com/en-us/azure/defender-for-cloud/how-to-manage-attack-path>
3. <https://learn.microsoft.com/en-us/azure/defender-for-cloud/concept-attack-path>
