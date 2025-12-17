# Description

Enable Microsoft Defender CSPM to continuously assess cloud resources for security misconfigurations, compliance risks, and exposure to threats.

## Rationale

Microsoft Defender CSPM provides detailed visibility into the security state of assets and workloads and offers hardening guidance to help improve security posture.

## Impact

Enabling Microsoft Defender CSPM incurs hourly charges for each billable compute, database, and storage resource. This can lead to significant costs in larger environments. Careful planning and cost analysis are recommended before enabling the service. Refer to <https://azure.microsoft.com/en-us/pricing/details/defender-for-cloud/#pricing> for pricing information.

## Audit

This policy flags an *Azure Subscription* as `INCOMPLIANT` if the related `Azure Defender Plan` for **CSPM** has its `Pricing Tier` set to **Free**.

A *Subscription* is also marked as `INCOMPLIANT` if the `Defender Plan` for **CSPM** does **not** exist in the CMDB.

## Default Value

By default, Microsoft Defender plan is `off`.

## References

1. <https://learn.microsoft.com/en-us/azure/defender-for-cloud/concept-cloud-security-posture-management>
2. <https://learn.microsoft.com/en-us/azure/defender-for-cloud/tutorial-enable-cspm-plan>
3. <https://azure.microsoft.com/en-us/pricing/details/defender-for-cloud/#pricing>
4. <https://learn.microsoft.com/en-us/cli/azure/security/pricing>
5. <https://learn.microsoft.com/en-us/powershell/module/az.security/get-azsecuritypricing>
6. <https://learn.microsoft.com/en-us/powershell/module/az.security/set-azsecuritypricing>
