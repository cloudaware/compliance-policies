# Remediation

## From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Defender for Cloud`.
3. Under `Management`, select `Environment Settings`.
4. Select the subscription.
5. Select `Integrations`.
6. Check `Allow Microsoft Defender for Cloud Apps to access my data`.
7. Select `Save`.

## From Azure CLI

Use the below command to set `Allow Microsoft Defender for Cloud Apps to access my data`:

```sh
az account get-access-token --query "{subscription:subscription,accessToken:accessToken}" --out tsv | xargs -L1 bash -c 'curl -X PUT -H "Authorization: Bearer $1" -H "Content-Type: application/json" https://management.azure.com/subscriptions/<subscription_ID>/providers/Microsoft.Security/settings/MCAS?api-version=2021-06-01 -d@"input.json"'
```

Where `input.json` contains the Request body json data as mentioned below:

```json
{
    "id": "/subscriptions/<Your_Subscription_Id>/providers/Microsoft.Security/settings/MCAS", 
    "kind": "DataExportSetting", 
    "type": "Microsoft.Security/settings", 
    "properties": { 
        "enabled": true
    }
}
```
