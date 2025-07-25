# Description

Create an activity log alert for the Delete Public IP Address event.

## Rationale

Monitoring for Delete Public IP Address events gives insight into network access changes and may reduce the time it takes to detect
suspicious activity.

## Impact

There will be a substantial increase in log size if there are a large number of administrative actions on a server.

## Audit

This policy evaluates *Azure Subscriptions* for the presence of an *Azure Activity Log Alert* that captures **Delete Public IP Address** events. A subscription is marked as `INCOMPLIANT` if it does **not** have an *Activity Log Alert* whose `Condition JSON` filters on the **Microsoft.Network/publicIPAddresses/delete** operation.

## Default Value

By default, no monitoring alerts are created or active.

## References

1. <https://azure.microsoft.com/en-us/updates/classic-alerting-monitoring-retirement>
2. <https://docs.microsoft.com/en-in/azure/azure-monitor/platform/alerts-activity-log>
3. <https://docs.microsoft.com/en-in/rest/api/monitor/activitylogalerts/createorupdate>
4. <https://docs.microsoft.com/en-in/rest/api/monitor/activitylogalerts/listbysubscriptionid>
5. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-3-enable-logging-for-security-investigation>
