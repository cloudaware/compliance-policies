# Description

Turning on Microsoft Defender for Storage enables threat detection for Storage, providing threat intelligence, anomaly detection, and behavior analytics in the Microsoft Defender for Cloud.

## Rationale

Enabling Microsoft Defender for Storage allows for greater defense-in-depth, with threat detection provided by the Microsoft Security Response Center (MSRC).

## Impact

Turning on Microsoft Defender for Storage incurs an additional cost per resource.

## Audit

This policy flags an *Azure Subscription* as `INCOMPLIANT` if the related `Azure Defender Plan` for **Storage Accounts** has its `Pricing Tier` set to **Free**.

A *Subscription* is also marked as `INCOMPLIANT` if the `Defender Plan` for **Storage Accounts** does **not** exist in the CMDB.

## Default Value

By default, Microsoft Defender plan is `off`.

## References

1. <https://learn.microsoft.com/en-us/azure/defender-for-cloud/alerts-overview>
2. <https://learn.microsoft.com/en-us/rest/api/defenderforcloud/pricings/list>
3. <https://learn.microsoft.com/en-us/rest/api/defenderforcloud/pricings/update>
4. <https://learn.microsoft.com/en-us/powershell/module/az.security/get-azsecuritypricing>
5. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-1-enable-threat-detection-capabilities>
