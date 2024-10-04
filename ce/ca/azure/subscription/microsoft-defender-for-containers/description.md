# Description

Turning on Microsoft Defender for Containers enables threat detection for Container Registries including Kubernetes, providing threat intelligence, anomaly detection, and behavior analytics in the Microsoft Defender for Cloud. The following services will be enabled for container instances:

- Defender agent in Azure
- Azure Policy for Kubernetes
- Agentless discovery for Kubernetes
- Agentless container vulnerability assessment

## Rationale

Enabling Microsoft Defender for Container Registries allows for greater defense-in-depth, with threat detection provided by the Microsoft Security Response Center (MSRC).

## Impact

Turning on Microsoft Defender for Containers incurs an additional cost per resource.

## Audit

### From Azure Portal

1. Go to `Microsoft Defender for Cloud`.
2. Under `Management`, select `Environment Settings`.
3. Click on the subscription name.
4. Select `Defender plans`.
5. Ensure the `Status` for `Containers` is set to `On`.

### From Azure CLI

Ensure the output of the commands below indicates `Standard` pricing.

For legacy Defender for Container Registries instances:

```sh
az security pricing show --name "ContainerRegistry" --query pricingTier
```

For new Defender for Containers instances:

```sh
az security pricing show --name "Containers" --query pricingTier
```

### From PowerShell

Ensure the output of the commands below indicates `Standard` pricing.

For legacy Defender for Container Registries instances:

```ps
Get-AzSecurityPricing -Name 'ContainerRegistry' | Select-Object Name,PricingTier
```

For new Defender for Containers instances:

```ps
Get-AzSecurityPricing -Name 'Containers' | Select-Object Name,PricingTier
```

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [1c988dd6-ade4-430f-a608-2a3e5b0a6d38](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F1c988dd6-ade4-430f-a608-2a3e5b0a6d38) - **Name**: `Microsoft Defender for Containers should be enabled`

## Default Value

By default, Microsoft Defender for Containers is `off`.

## References

1. <https://docs.microsoft.com/en-us/azure/security-center/security-center-detection-capabilities>
2. <https://docs.microsoft.com/en-us/rest/api/securitycenter/pricings/list>
3. <https://docs.microsoft.com/en-us/rest/api/securitycenter/pricings/update>
4. <https://docs.microsoft.com/en-us/powershell/module/az.security/get-azsecuritypricing>
5. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-1-enable-threat-detection-capabilities>
6. <https://docs.microsoft.com/en-us/azure/defender-for-cloud/defender-for-containers-introduction?tabs=defender-for-container-arch-aks>
