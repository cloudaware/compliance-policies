# Description

Turning on Microsoft Defender for Servers enables threat detection for Servers, providing threat intelligence, anomaly detection, and behavior analytics in the Microsoft Defender for Cloud.

## Rationale

Enabling Microsoft Defender for Servers allows for greater defense-in-depth, with threat detection provided by the Microsoft Security Response Center (MSRC).

## Impact

Turning on Microsoft Defender for Servers in Microsoft Defender for Cloud incurs an additional cost per resource.

Two Defender for Servers plans exist:

- Plan 1: Subscription only
- Plan 2: Subscription and workspace

## Audit

### From Azure Portal

1. Go to `Microsoft Defender for Cloud`.
2. Under `Management`, select `Environment Settings`.
3. Click on the subscription name.
4. Select `Defender plans` in the left pane.
5. Under `Cloud Workload Protection (CWP)`, locate `Server` in the Plan column, ensure Status is set to `On`.

### From Azure CLI

Run the following command:

```sh
az security pricing show -n VirtualMachines --query pricingTier
```

If the tenant is licensed and enabled, the output should indicate `Standard`.

### From PowerShell

Run the following command:

```ps
Get-AzSecurityPricing -Name 'VirtualMachines' |Select-Object Name,PricingTier
```

If the tenant is licensed and enabled, the `PricingTier` parameter will indicate `Standard`.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [4da35fc9-c9e7-4960-aec9-797fe7d9051d](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F4da35fc9-c9e7-4960-aec9-797fe7d9051d) - **Name**: `Azure Defender for servers should be enabled`

## Default Value

By default, Microsoft Defender plan is `off`.

## References

1. <https://learn.microsoft.com/en-us/azure/defender-for-cloud/plan-defender-for-servers>
2. <https://learn.microsoft.com/en-us/rest/api/defenderforcloud/pricings/list?view=rest-defenderforcloud-2024-01-01&tabs=HTTP>
3. <https://learn.microsoft.com/en-us/rest/api/defenderforcloud/pricings/update?view=rest-defenderforcloud-2024-01-01&tabs=HTTP>
4. <https://learn.microsoft.com/en-us/powershell/module/az.security/get-azsecuritypricing?view=azps-12.2.0>
5. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-endpoint-security#es-1-use-endpoint-detection-and-response-edr>
