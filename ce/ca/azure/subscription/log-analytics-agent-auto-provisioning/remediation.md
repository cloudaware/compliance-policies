# Remediation

## From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Defender for Cloud`.
3. Under `Management`, select `Environment Settings`.
4. Select a subscription.
5. Click on `Settings & monitoring`.
6. Set the `Status` of `Log Analytics agent` to `On`.
7. Select a Workspace.
8. Click `Apply`.
9. Click `Continue`.

Repeat the above for any additional subscriptions.

## From Azure CLI

Use the below command to set `Automatic provisioning of monitoring agent` to `On`:

```sh
az account get-access-token --query "{subscription:subscription,accessToken:accessToken}" --out tsv | xargs -L1 bash -c 'curl -X PUT -H "Authorization: Bearer $1" -H "Content-Type: application/json" https://management.azure.com/subscriptions/subscriptionID/providers/Microsoft.Security/autoProvisioningSettings/default?api-version=2017-08-01-preview -d@"input.json"'
```

Where `input.json` contains the Request body json data as mentioned below:

```json
{
    "id": "/subscriptions/<Your_Subscription_Id>/providers/Microsoft.Security/autoProvisioningSettings/default", 
    "name": "default", 
    "type": "Microsoft.Security/autoProvisioningSettings", 
    "properties": { 
        "autoProvision": "On" 
    } 
}
```
