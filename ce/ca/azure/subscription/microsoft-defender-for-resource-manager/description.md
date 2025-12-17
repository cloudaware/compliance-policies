# Description

Microsoft Defender for Resource Manager scans incoming administrative requests to change your infrastructure from both CLI and the Azure portal.

## Rationale

Scanning resource requests lets you be alerted every time there is suspicious activity in order to prevent a security threat from being introduced.

## Impact

Enabling Microsoft Defender for Resource Manager requires enabling Microsoft Defender for your subscription. Both will incur additional charges.

## Audit

This policy flags an *Azure Subscription* as `INCOMPLIANT` if the related `Azure Defender Plan` for **Resource Manager** has its `Pricing Tier` set to **Free**.

A *Subscription* is also marked as `INCOMPLIANT` if the `Defender Plan` for **Resource Manager** does **not** exist in the CMDB.

## Default Value

By default, Microsoft Defender for Resource Manager is not enabled.

## References

1. <https://learn.microsoft.com/en-us/azure/defender-for-cloud/connect-azure-subscription>
2. <https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-for-resource-manager-introduction>
3. <https://azure.microsoft.com/en-us/pricing/details/defender-for-cloud/>
4. <https://learn.microsoft.com/en-us/azure/defender-for-cloud/alerts-overview>
5. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-1-enable-threat-detection-capabilities>
