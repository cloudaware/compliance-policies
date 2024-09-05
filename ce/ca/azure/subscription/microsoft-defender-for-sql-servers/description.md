# Description

Turning on Microsoft Defender for SQL servers on machines enables threat detection for SQL servers on machines, providing threat intelligence, anomaly detection, and behavior analytics in Microsoft Defender for Cloud.

## Rationale

Enabling Microsoft Defender for SQL servers on machines allows for greater defense-in-depth, functionality for discovering and classifying sensitive data, surfacing and mitigating potential database vulnerabilities, and detecting anomalous activities that could indicate a threat to your database.

## Impact

Turning on Microsoft Defender for SQL servers on machines incurs an additional cost per resource.

## Audit

### From Azure Portal

1. Go to `Microsoft Defender for Cloud`.
2. Select `Environment Settings` blade.
3. Click on the subscription name.
4. Select the `Defender plans` blade.
5. Click `Select types >` in the row for `Databases`.
6. Ensure the radio button next to `SQL servers on machines` is set to `On`.

### From Azure CLI

Ensure Defender for SQL is licensed with the following command:

```sh
az security pricing show -n SqlServerVirtualMachines
```

Ensure the `PricingTier` is set to `Standard`.

### From PowerShell

Run the following command:

```ps
Get-AzSecurityPricing -Name 'SqlServerVirtualMachines' | Select-Object Name,PricingTier
```

Ensure the `PricingTier` is set to `Standard`.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [6581d072-105e-4418-827f-bd446d56421b](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F6581d072-105e-4418-827f-bd446d56421b) - **Name**: `Azure Defender for SQL servers on machines should be enabled`

- **Policy ID**: [abfb4388-5bf4-4ad7-ba82-2cd2f41ceae9](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Fabfb4388-5bf4-4ad7-ba82-2cd2f41ceae9) - **Name**: `Azure Defender for SQL should be enabled for unprotected Azure SQL servers`

## Default Value

By default, Microsoft Defender plan is `off`.

## References

1. <https://docs.microsoft.com/en-us/azure/security-center/defender-for-sql-usage>
2. <https://docs.microsoft.com/en-us/azure/security-center/security-center-detection-capabilities>
3. <https://docs.microsoft.com/en-us/rest/api/securitycenter/pricings/update>
4. <https://docs.microsoft.com/en-us/powershell/module/az.security/get-azsecuritypricing>
5. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-data-protection#dp-2-monitor-anomalies-and-threats-targeting-sensitive-data>
6. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-1-enable-threat-detection-capabilities>
