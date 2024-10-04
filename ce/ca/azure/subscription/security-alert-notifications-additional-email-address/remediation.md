# Remediation

## From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Defender for Cloud`.
3. Under `Management`, select `Environment Settings`.
4. Click on the appropriate Management Group, Subscription, or Workspace.
5. Click on `Email notifications`.
6. Enter a valid security contact email address (or multiple addresses separated by commas) in the `Additional email addresses` field.
7. Click `Save`.

## From Azure CLI

Use the below command to set `Security contact emails` to `On`:

```sh
az account get-access-token --query "{subscription:subscription,accessToken:accessToken}" --out tsv | xargs -L1 bash -c 'curl -X PUT -H "Authorization: Bearer $1" -H "Content-Type: application/json" https://management.azure.com/subscriptions/$0/providers/Microsoft.Security/securityContacts/default?api-version=2020-01-01-preview -d@"input.json"'
```

Where `input.json` contains the data below, replacing `validEmailAddress` with a single email address or multiple comma-separated email addresses:

```json
{ 
    "id": "/subscriptions/<Your_Subscription_Id>/providers/Microsoft.Security/securityContacts/default", 
    "name": "default", 
    "type": "Microsoft.Security/securityContacts", 
    "properties": { 
        "email": "<validEmailAddress>", 
        "alertNotifications": "On", 
        "alertsToAdmins": "On" 
    } 
}
```
