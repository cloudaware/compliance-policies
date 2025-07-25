# Description

Microsoft Defender for Azure Cosmos DB scans all incoming network requests for threats to your Azure Cosmos DB resources.

## Rationale

In scanning Azure Cosmos DB requests within a subscription, requests are compared to a heuristic list of potential security threats. These threats could be a result of a security breach within your services, thus scanning for them could prevent a potential security threat from being introduced.

## Impact

Enabling Microsoft Defender for Azure Cosmos DB requires enabling Microsoft Defender for your subscription. Both will incur additional charges.

## Audit

This policy flags an *Azure Subscription* as `INCOMPLIANT` if the related `Azure Defender Plan` for **Cosmos DBs** has its `Pricing Tier` set to **Free**.

A *Subscription* is also marked as `INCOMPLIANT` if the `Defender Plan` for **Cosmos DBs** does **not** exist in the CMDB.

## Default Value

By default, Microsoft Defender for Azure Cosmos DB is not enabled.

## References

1. <https://azure.microsoft.com/en-us/pricing/details/defender-for-cloud/>
2. <https://docs.microsoft.com/en-us/azure/defender-for-cloud/enable-enhanced-security>
3. <https://docs.microsoft.com/en-us/azure/defender-for-cloud/alerts-overview>
4. <https://docs.microsoft.com/en-us/security/benchmark/azure/baselines/cosmos-db-security-baseline>
5. <https://docs.microsoft.com/en-us/azure/defender-for-cloud/quickstart-enable-database-protections>
6. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-1-enable-threat-detection-capabilities>
