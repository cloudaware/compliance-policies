# Description

Microsoft Defender for APIs offers full lifecycle protection, detection, and response coverage for APIs.

While an automated assessment procedure exists for this recommendation, the assessment status remains manual. Due to its potentially high cost, Microsoft Defender for APIs may not be suitable for all environments and should be evaluated carefully before implementation.

## Rationale

Microsoft Defender for APIs helps provide visibility into business-critical APIs, assess and improve their security posture, prioritize vulnerability remediation, and detect threats in real time.

## Impact

Microsoft Defender for APIs uses a tiered pricing model, billed per subscription per hour, with each tier allowing a set limit of API calls. In high-traffic environments, this may result in significant or prohibitive costs. Careful evaluation of API usage patterns and pricing tiers is essential before enabling the service. Refer to <https://azure.microsoft.com/en-us/pricing/details/defender-for-cloud/#pricing> for pricing information.

## Audit

This policy flags an *Azure Subscription* as `INCOMPLIANT` if the related `Azure Defender Plan` for **APIs** has its `Pricing Tier` set to **Free**.

A *Subscription* is also marked as `INCOMPLIANT` if the `Defender Plan` for **APIs** does **not** exist in the CMDB.

## Default Value

By default, Microsoft Defender plan is `off`.

## References

1. <https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-for-apis-introduction>
2. <https://azure.microsoft.com/en-us/pricing/details/defender-for-cloud/#pricing>
3. <https://learn.microsoft.com/en-us/cli/azure/security/pricing>
4. <https://learn.microsoft.com/en-us/powershell/module/az.security/get-azsecuritypricing>
5. <https://learn.microsoft.com/en-us/powershell/module/az.security/set-azsecuritypricing>
