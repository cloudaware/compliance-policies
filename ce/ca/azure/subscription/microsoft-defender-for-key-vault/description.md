# Description

Turning on Microsoft Defender for Key Vault enables threat detection for Key Vault, providing threat intelligence, anomaly detection, and behavior analytics in the Microsoft Defender for Cloud.

## Rationale

Enabling Microsoft Defender for Key Vault allows for greater defense-in-depth, with threat detection provided by the Microsoft Security Response Center (MSRC).

## Impact

Turning on Microsoft Defender for Key Vault incurs an additional cost per resource.

## Audit

### From Azure Portal

1. Go to `Microsoft Defender for Cloud`.
2. Select `Environment Settings` blade.
3. Click on the subscription name.
4. Select the `Defender plans` blade.
5. Ensure `Status` is set to `On` for `Key Vault`.

### From Azure CLI

Ensure the output of the below command is `Standard`:

```sh
az security pricing show -n 'KeyVaults' --query 'PricingTier'
```

### From PowerShell

```ps
Get-AzSecurityPricing -Name 'KeyVaults' | Select-Object Name,PricingTier
```

Ensure output for `PricingTier` is `Standard`.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [0e6763cc-5078-4e64-889d-ff4d9a839047](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F0e6763cc-5078-4e64-889d-ff4d9a839047) - **Name**: `Azure Defender for Key Vault should be enabled`

## Default Value

By default, Microsoft Defender plan is `off`.

## References

1. <https://docs.microsoft.com/en-us/azure/security-center/security-center-detection-capabilities>
2. <https://docs.microsoft.com/en-us/rest/api/securitycenter/pricings/list>
3. <https://docs.microsoft.com/en-us/rest/api/securitycenter/pricings/update>
4. <https://docs.microsoft.com/en-us/powershell/module/az.security/get-azsecuritypricing>
5. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-1-enable-threat-detection-capabilities>
