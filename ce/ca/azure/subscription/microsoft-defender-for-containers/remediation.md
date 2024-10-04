# Remediation

## From Azure Portal

1. Go to `Microsoft Defender for Cloud`.
2. Under `Management`, select `Environment Settings`.
3. Click on the subscription name.
4. Select `Defender plans`.
5. Set `Status` to `On` for `Containers`.
6. Click `Save`.

## From Azure CLI

**Note**: `ContainerRegistry` has been deprecated and is replaced by `Containers`.

Use the below command to enable `Standard` pricing tier for `Containers`:

```sh
az security pricing create -n 'Containers' --tier 'standard'
```

## From PowerShell

**Note**: `ContainerRegistry` has been deprecated and is replaced by `Containers`.

Use the below command to enable `Standard` pricing tier for `Containers`:

```ps
Set-AzSecurityPricing -Name 'Containers' -PricingTier 'Standard'
```
