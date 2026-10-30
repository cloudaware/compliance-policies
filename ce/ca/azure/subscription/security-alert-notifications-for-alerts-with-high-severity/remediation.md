# Remediation

## From Azure Portal

1. From Azure Home, select the Portal Menu.
2. Select `Microsoft Defender for Cloud`.
3. Under `Management`, select `Environment Settings`.
4. Click on the appropriate Management Group, Subscription, or Workspace.
5. Click on `Email notifications`.
6. Under `Notification types`, check the box next to `Notify about alerts with the following severity (or higher)` and select `High` from the drop-down menu.
7. Click `Save`.
8. Repeat steps 1-7 for each Subscription requiring remediation.

## From Azure CLI

Use the following command to set `Send email notification for high severity alerts` to `On`.

```sh
az account get-access-token \
    --query "{subscription:subscription,accessToken:accessToken}" \
    --out tsv | xargs -L1 bash -c 'curl -X PUT -H "Authorization: Bearer $1" -H "Content-Type: application/json" https://management.azure.com/subscriptions/{{subscription-id}}/providers/Microsoft.Security/securityContacts/default1?api-version=2017-08-01-preview -d@"input.json"'
```

Where `input.json` contains the data below, replacing `validEmailAddress` with a single email address or multiple comma-separated email addresses:

```json
{
    "id": "/subscriptions/{{subscription-id}}/providers/Microsoft.Security/securityContacts/default1", 
    "name": "default1", 
    "type": "Microsoft.Security/securityContacts", 
    "properties": { 
        "email": "{{security-contact-email}}", 
        "alertNotifications": "On", 
        "alertsToAdmins": "On" 
    }
}
```
