# Remediation

## From Azure Portal

1. Go to `Microsoft Defender for Cloud`.
2. Under `Management`, select `Environment Settings`.
3. Click the name of a subscription.
4. Select the `Defender plans` blade.
5. Under `Cloud Security Posture Management (CSPM)`, in the row for `Defender CSPM`, set the toggle switch for `Status` to `On`.
6. Click `Save`.

## From Azure CLI

Run the following command to enable Defender CSPM:

```sh
az security pricing create --name CloudPosture --tier Standard --extensions name=ApiPosture isEnabled=true
```

## From PowerShell

Run the following command to enable Defender CSPM:

```ps
Set-AzSecurityPricing -Name CloudPosture -PricingTier Standard -Extension '[{"name":"ApiPosture","isEnabled":"True"}]'
```
