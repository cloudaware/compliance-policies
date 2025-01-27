# Remediation

## From Azure Console

1. From Azure Home select the Portal Menu.
2. Go to `Microsoft Defender for Cloud`.
3. Under `Management`, select `Environment Settings`.
4. Click on the subscription name.
5. Click `Settings & monitoring`.
6. Set the `Status` for `Endpoint protection` to `On`.
7. Click `Continue`.

## From Azure CLI

Use the below command to set `Allow Microsoft Defender for Endpoint to access my data`:

```sh
az account get-access-token --query "{subscription:subscription,accessToken:accessToken}" --out tsv | xargs -L1 bash -c 'curl -X PUT -H "Authorization: Bearer $1" -H "Content-Type: application/json" https://management.azure.com/subscriptions/<subscriptionID>/providers/Microsoft.Security/settings/WDATP?api-version=2021-06-01 -d@"input.json"'
```

Where `input.json` contains the Request body json data as mentioned below:

```json
{ 
    "id": "/subscriptions/<Your_Subscription_Id>/providers/Microsoft.Security/settings/WDATP", 
    "kind": "DataExportSettings", 
    "type": "Microsoft.Security/settings", 
    "properties": { 
        "enabled": true 
    }
}
```
