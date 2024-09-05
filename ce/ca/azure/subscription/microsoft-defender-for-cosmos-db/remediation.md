# Remediation

## From Azure Portal

1. Go to `Microsoft Defender for Cloud`.
2. Select `Environment Settings` blade.
3. Click on the subscription name.
4. Select the `Defender plans` blade.
5. On the `Database` row click on `Select types >`.
6. Set the radio button next to `Azure Cosmos DB` to `On`.
7. Click `Continue`.
8. Click `Save`.

## From Azure CLI

Run the following command:

```sh
az security pricing create -n 'CosmosDbs' --tier 'standard'
```

## From PowerShell

Use the below command to enable Standard pricing tier for Azure Cosmos DB:

```ps
Set-AzSecurityPricing -Name 'CosmosDbs' -PricingTier 'Standard
```
