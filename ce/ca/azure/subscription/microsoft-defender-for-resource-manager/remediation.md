# Remediation

## From Azure Portal

1. Go to `Microsoft Defender for Cloud`.
2. Under `Management`, select `Environment Settings`.
3. Click on the subscription name.
4. Select the `Defender plans` blade.
5. Select `On` under `Status` for `Resource Manager`.
6. Select `Save`.

## From Azure CLI

Use the below command to enable Standard pricing tier for Defender for Resource Manager:

```sh
az security pricing create -n 'Arm' --tier 'Standard'
```

## From PowerShell

Use the below command to enable Standard pricing tier for Defender for Resource Manager:

```ps
Set-AzSecurityPricing -Name 'Arm' -PricingTier 'Standard'
```
