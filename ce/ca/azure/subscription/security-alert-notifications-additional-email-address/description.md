# Description

Microsoft Defender for Cloud emails the subscription owners whenever a high-severity alert is triggered for their subscription. You should provide a security contact email address as an additional email address.

## Rationale

Microsoft Defender for Cloud emails the Subscription Owner to notify them about security alerts. Adding your Security Contact's email address to the 'Additional email addresses' field ensures that your organization's Security Team is included in these alerts. This ensures that the proper people are aware of any potential compromise in order to mitigate the risk in a timely fashion.

## Audit

### From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Defender for Cloud`.
3. Under `Management`, select `Environment Settings`.
4. Click on the appropriate Management Group, Subscription, or Workspace.
5. Click on `Email notifications`.
6. Ensure that a valid security contact email address is listed in the `Additional email addresses` field.

### From Azure CLI

Ensure the output of the below command is set not empty and is set with appropriate email ids:

```sh
az account get-access-token --query "{subscription:subscription,accessToken:accessToken}" --out tsv | xargs -L1 bash -c 'curl -X GET -H "Authorization: Bearer $1" -H "Content-Type: application/json" https://management.azure.com/subscriptions/$0/providers/Microsoft.Security/securityContacts?api-version=2020-01-01-preview' | jq '.|.[] | select(.name=="default")'|jq '.properties.emails'
```

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [4f4f78b8-e367-4b10-a341-d9a4ad5cf1c7](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F4f4f78b8-e367-4b10-a341-d9a4ad5cf1c7) - **Name**: `Subscriptions should have a contact email address for security issues`

## Default Value

By default, there are no additional email addresses entered.

## References

1. <https://docs.microsoft.com/en-us/azure/security-center/security-center-provide-security-contact-details>
2. <https://docs.microsoft.com/en-us/rest/api/securitycenter/securitycontacts/list>
3. <https://docs.microsoft.com/en-us/rest/api/securitycenter/security-contacts>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-incident-response#ir-2-preparation---setup-incident-notification>

## Additional Information

Excluding any entries in the input.json properties block disables the specific setting by default.
