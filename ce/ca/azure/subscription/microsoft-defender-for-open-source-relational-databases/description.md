# Description

Turning on Microsoft Defender for Open-source relational databases enables threat detection for Open-source relational databases, providing threat intelligence, anomaly detection, and behavior analytics in the Microsoft Defender for Cloud.

## Rationale

Enabling Microsoft Defender for Open-source relational databases allows for greater defense-in-depth, with threat detection provided by the Microsoft Security Response Center (MSRC).

## Impact

Turning on Microsoft Defender for Open-source relational databases incurs an additional cost per resource.

## Audit

### From Azure Portal

1. Go to `Microsoft Defender for Cloud`.
2. Under `Management`, select `Environment Settings`.
3. Click on the subscription name.
4. Select the `Defender plans` blade.
5. Click `Select types >` in the row for `Databases`.
6. Ensure the toggle switch next to `Open-source relational databases` is set to `On`.

### From Azure CLI

Run the following command:

```sh
az security pricing show -n OpenSourceRelationalDatabases --query pricingTier
```

### From PowerShell

```ps
Get-AzSecurityPricing | Where-Object {$_.Name -eq 'OpenSourceRelationalDatabases'} | Select-Object Name, PricingTier
```

Ensure output for Name `PricingTier` is `OpenSourceRelationalDatabases Standard`.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [0a9fbe0d-c5c4-4da8-87d8-f4fd77338835](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F0a9fbe0d-c5c4-4da8-87d8-f4fd77338835) - **Name**: `Azure Defender for open-source relational databases should be enabled`

## Default Value

By default, Microsoft Defender plan is `off`.

## References

1. <https://docs.microsoft.com/en-us/azure/security-center/security-center-detection-capabilities>
2. <https://docs.microsoft.com/en-us/rest/api/securitycenter/pricings/update>
3. <https://docs.microsoft.com/en-us/powershell/module/az.security/get-azsecuritypricing>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-data-protection#dp-2-monitor-anomalies-and-threats-targeting-sensitive-data>
5. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-1-enable-threat-detection-capabilities>
