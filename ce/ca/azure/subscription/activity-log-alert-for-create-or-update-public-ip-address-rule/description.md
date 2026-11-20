# Description

Create an activity log alert for the Create or Update Public IP Addresses event.

## Rationale

Monitoring for Create or Update Public IP Address events gives insight into network access changes and may reduce the time it takes to detect suspicious activity.

## Impact

There will be a substantial increase in log size if there are a large number of administrative actions on a server.

## Audit

This policy marks an *Azure Subscription* as `INCOMPLIANT` if no current enabled *Activity Log Alert* covers category **Administrative** and operation **Microsoft.Network/publicIPAddresses/write** across the subscription with a resolved action group and no additional condition filters. Field/value pairs must occur in the same condition.

A qualifying alert makes the subscription `COMPLIANT`. Otherwise, unassessable alert configuration produces `UNDETERMINED`. Complex or narrower scopes require manual review. Action-group recipients, receiver enablement and actual notification delivery are not verified. Service-specific exceptions require a recorded organizational scoping decision.

## Default Value

By default, no monitoring alerts are created or active.

## References

1. <https://azure.microsoft.com/en-us/updates?id=classic-alerting-monitoring-retirement>
2. <https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-create-activity-log-alert-rule>
3. <https://learn.microsoft.com/en-us/rest/api/monitor/activity-log-alerts/create-or-update>
4. <https://learn.microsoft.com/en-us/rest/api/monitor/activity-log-alerts/list-by-subscription-id>
5. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-3-enable-logging-for-security-investigation>
