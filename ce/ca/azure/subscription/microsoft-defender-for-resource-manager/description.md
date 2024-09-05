# Description

Microsoft Defender for Resource Manager scans incoming administrative requests to change your infrastructure from both CLI and the Azure portal.

## Rationale

Scanning resource requests lets you be alerted every time there is suspicious activity in order to prevent a security threat from being introduced.

## Impact

Enabling Microsoft Defender for Resource Manager requires enabling Microsoft Defender for your subscription. Both will incur additional charges.

## Audit

### From Azure Portal

1. Go to `Microsoft Defender for Cloud`.
2. Select `Environment Settings` blade.
3. Click on the subscription name.
4. Select the `Defender plans` blade.
5. Ensure `Status` is set to `On` for `Resource Manager`.

### From Azure CLI

Ensure the output of the below command is `Standard`:

```sh
az security pricing show -n 'Arm' --query 'PricingTier'
```

### From Azure PowerShell

```ps
Get-AzSecurityPricing -Name 'Arm' | Select-Object Name,PricingTier
```

Ensure the output of `PricingTier` is `Standard`.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [c3d20c29-b36d-48fe-808b-99a87530ad99](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Fc3d20c29-b36d-48fe-808b-99a87530ad99) - **Name**: `Azure Defender for Resource Manager should be enabled`

## Default Value

By default, Microsoft Defender for Resource Manager is not enabled.

## References

1. <https://docs.microsoft.com/en-us/azure/defender-for-cloud/enable-enhanced-security>
2. <https://docs.microsoft.com/en-us/azure/defender-for-cloud/defender-for-resource-manager-introduction>
3. <https://azure.microsoft.com/en-us/pricing/details/defender-for-cloud/>
4. <https://docs.microsoft.com/en-us/azure/defender-for-cloud/alerts-overview>
5. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-1-enable-threat-detection-capabilities>
