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

1. <https://azure.microsoft.com/en-us/updates?id=classic-alerting-monitoring-retirement>
2. <https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-create-activity-log-alert-rule>
3. <https://learn.microsoft.com/en-us/rest/api/monitor/activity-log-alerts/create-or-update>
4. <https://learn.microsoft.com/en-us/rest/api/monitor/activity-log-alerts/list-by-subscription-id>
5. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-3-enable-logging-for-security-investigation>
