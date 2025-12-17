# Description

Turning on Microsoft Defender for SQL servers on machines enables threat detection for SQL servers on machines, providing threat intelligence, anomaly detection, and behavior analytics in Microsoft Defender for Cloud.

## Rationale

Enabling Microsoft Defender for SQL servers on machines allows for greater defense-in-depth, functionality for discovering and classifying sensitive data, surfacing and mitigating potential database vulnerabilities, and detecting anomalous activities that could indicate a threat to your database.

## Impact

Turning on Microsoft Defender for SQL servers on machines incurs an additional cost per resource.

## Audit

This policy flags an *Azure Subscription* as `INCOMPLIANT` if the related `Azure Defender Plan` for **SQL Servers on Virtual Machines** has its `Pricing Tier` set to **Free**.

A *Subscription* is also marked as `INCOMPLIANT` if the `Defender Plan` for **SQL Servers on Virtual Machines** does **not** exist in the CMDB.

## Default Value

By default, Microsoft Defender plan is `off`.

## References

1. <https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-for-sql-usage>
2. <https://learn.microsoft.com/en-us/azure/defender-for-cloud/alerts-overview>
3. <https://learn.microsoft.com/en-us/rest/api/defenderforcloud/pricings/update>
4. <https://learn.microsoft.com/en-us/powershell/module/az.security/get-azsecuritypricing>
5. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-data-protection#dp-2-monitor-anomalies-and-threats-targeting-sensitive-data>
6. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-1-enable-threat-detection-capabilities>
