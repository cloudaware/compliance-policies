# Description

Enables emailing security alerts to the subscription owner or other designated security contact.

## Rationale

Enabling security alert emails ensures that security alert emails are received from Microsoft. This ensures that the right people are aware of any potential security issues and are able to mitigate the risk.

## Audit

### From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Defender for Cloud`.
3. Under `Management`, select `Environment Settings`.
4. Click on the appropriate Management Group, Subscription, or Workspace.
5. Click on `Email notifications`.
6. Ensure that the `Notify about alerts with the following severity (or higher)` setting is checked and set to `High`.

### From Azure CLI

Ensure the output of below command is set to `True`, enter your Subscription ID at the $0 between /subscriptions/<$0>/providers:

```sh
az account get-access-token --query "{subscription:subscription,accessToken:accessToken}" --out tsv | xargs -L1 bash -c 'curl -X GET -H "Authorization: Bearer $1" -H "Content-Type: application/json" https://management.azure.com/subscriptions/$0/providers/Microsoft.Security/securityContacts?api-version=2020-01-01-preview' | jq '.|.[] | select(.name=="default")'|jq '.properties.alertNotifications'
```

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
