# Remediation

## From Azure Portal

1. Go to `Microsoft Defender for Cloud`.
2. Select `Environment Settings` blade.
3. Click on the subscription name.
4. Select the `Defender plans` blade.
5. Select `On` under `Status` for `DNS`.
6. Select `Save`.

## From Powershell

Enable Standard pricing tier for DNS:

```sh
az security pricing create -n 'DNS' --tier 'Standard'
```

## From PowerShell

Enable Standard pricing tier for DNS:

```ps
Set-AzSecurityPricing -Name 'DNS' -PricingTier 'Standard'
```
