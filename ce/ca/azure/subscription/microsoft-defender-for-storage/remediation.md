# Remediation

## From Azure Portal

1. Go to `Microsoft Defender for Cloud`.
2. Select `Environment Settings` blade.
3. Click on the subscription name.
4. Select the `Defender plans` blade.
5. Set `Status` to `On` for `Storage`.
6. Select `Save`.

## From Azure CLI

Ensure the output of the below command is `Standard`:

```sh
az security pricing create -n StorageAccounts --tier 'standard'
```

## From PowerShell

```ps
Set-AzSecurityPricing -Name 'StorageAccounts' -PricingTier 'Standard'
```
