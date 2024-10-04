# Description

Enable security alert emails to subscription owners.

## Rationale

Enabling security alert emails to subscription owners ensures that they receive security alert emails from Microsoft. This ensures that they are aware of any potential security issues and can mitigate the risk in a timely fashion.

## Audit

### From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Defender for Cloud`.
3. Under `Management`, select `Environment Settings`.
4. Click on the appropriate Management Group, Subscription, or Workspace.
5. Click on `Email notifications`.
6. Ensure that `All users with the following roles` is set to `Owner`.

### From Azure CLI

Ensure the command below returns state of `On` and that `Owner` appears in roles:

```sh
az account get-access-token --query "{subscription:subscription,accessToken:accessToken}" --out tsv | xargs -L1 bash -c 'curl -X GET -H "Authorization: Bearer $1" -H "Content-Type: application/json" https://management.azure.com/subscriptions/$0/providers/Microsoft.Security/securityContacts?api-version=2020-01-01-preview'| jq '.[] | select(.name=="default").properties.notificationsByRole'
```

## Default Value

By default, `Owner` is selected.

## References

1. <https://docs.microsoft.com/en-us/azure/security-center/security-center-provide-security-contact-details>
2. <https://docs.microsoft.com/en-us/rest/api/securitycenter/securitycontacts/list>
3. <https://docs.microsoft.com/en-us/rest/api/securitycenter/security-contacts>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-incident-response#ir-2-preparation---setup-incident-notification>

## Additional Information

Excluding any entries in the `input.json` properties block disables the specific setting by default.
