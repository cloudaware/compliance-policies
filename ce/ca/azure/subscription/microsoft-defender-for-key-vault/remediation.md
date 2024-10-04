# Remediation

## From Azure Portal

1. Go to `Microsoft Defender for Cloud`.
2. Under `Management`, select `Environment Settings`.
3. Click on the subscription name.
4. Select the `Defender plans` blade.
5. Select `On` under `Status` for `Key Vault`.
6. Select `Save`.

## From Azure CLI

Enable Standard pricing tier for Key Vault:

```sh
az security pricing create -n 'KeyVaults' --tier 'Standard'
```

### From PowerShell

Enable Standard pricing tier for Key Vault:

```ps
Set-AzSecurityPricing -Name 'KeyVaults' -PricingTier 'Standard'
```
