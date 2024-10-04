# Remediation

## From Azure Portal

1. Go to `Microsoft Defender for Cloud`.
2. Under `Management`, select `Environment Settings`.
3. Click on the subscription name.
4. Select the `Defender plans` blade.
5. Click `Select types >` in the row for `Databases`.
6. Set the toggle switch next to `SQL servers on machines` to `On`.
7. Select `Continue`.
8. Select `Save`.

## From Azure CLI

Run the following command:

```sh
az security pricing create -n SqlServerVirtualMachines --tier 'standard'
```

## From PowerShell

Run the following command:

```ps
Set-AzSecurityPricing -Name 'SqlServerVirtualMachines' -PricingTier 'Standard'
```
