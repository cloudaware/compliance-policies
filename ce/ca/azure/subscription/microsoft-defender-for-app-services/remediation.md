# Remediation

## From Azure Portal

1. Go to `Microsoft Defender for Cloud`.
2. Select `Environment Settings`.
3. Click on the subscription name.
4. Select `Defender plans`.
5. Set `App Service` Status to `On`.
6. Select `Save`.

## From Azure CLI

Run the following command:

```sh
az security pricing create -n Appservices --tier 'standard'
```

## From PowerShell

Run the following command:

```ps
Set-AzSecurityPricing -Name "AppServices" -PricingTier "Standard"
```
