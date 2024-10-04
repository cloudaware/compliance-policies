# Description

Microsoft Defender for Azure Cosmos DB scans all incoming network requests for threats to your Azure Cosmos DB resources.

## Rationale

In scanning Azure Cosmos DB requests within a subscription, requests are compared to a heuristic list of potential security threats. These threats could be a result of a security breach within your services, thus scanning for them could prevent a potential security threat from being introduced.

## Impact

Enabling Microsoft Defender for Azure Cosmos DB requires enabling Microsoft Defender for your subscription. Both will incur additional charges.

## Audit

### From Azure Portal

1. Go to `Microsoft Defender for Cloud`.
2. Under `Management`, select `Environment Settings`.
3. Click on the subscription name.
4. Select the `Defender plans` blade.
5. On the `Database` row click on `Select types >`.
6. Ensure the toggle switch next to `Azure Cosmos DB` is set to `On`.

### From Azure CLI

Ensure the output of the below command is `Standard`:

```sh
az security pricing show -n CosmosDbs --query pricingTier
```

### From PowerShell

```ps
Get-AzSecurityPricing -Name 'CosmosDbs' | Select-Object Name,PricingTier
```

Ensure output of `PricingTier` is `Standard`.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [adbe85b5-83e6-4350-ab58-bf3a4f736e5e](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Fadbe85b5-83e6-4350-ab58-bf3a4f736e5e) - **Name**: `Microsoft Defender for Azure Cosmos DB should be enabled`

## Default Value

By default, Microsoft Defender for Azure Cosmos DB is not enabled.

## References

1. <https://azure.microsoft.com/en-us/pricing/details/defender-for-cloud/>
2. <https://docs.microsoft.com/en-us/azure/defender-for-cloud/enable-enhanced-security>
3. <https://docs.microsoft.com/en-us/azure/defender-for-cloud/alerts-overview>
4. <https://docs.microsoft.com/en-us/security/benchmark/azure/baselines/cosmos-db-security-baseline>
5. <https://docs.microsoft.com/en-us/azure/defender-for-cloud/quickstart-enable-database-protections>
6. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-1-enable-threat-detection-capabilities>
