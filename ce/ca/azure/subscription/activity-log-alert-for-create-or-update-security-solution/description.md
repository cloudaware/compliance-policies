# Description

Create an activity log alert for the Create or Update Security Solution event.

## Rationale

Monitoring for Create or Update Security Solution events gives insight into changes to the active security solutions and may reduce the time it takes to detect suspicious activity.

## Audit

This policy evaluates *Azure Subscriptions* for the presence of an *Azure Activity Log Alert* that captures **Create or Update Security Solution** events. A subscription is marked as `INCOMPLIANT` if it does **not** have an *Activity Log Alert* whose `Condition JSON` filters on the **Microsoft.Security/securitySolutions/write** operation.

## Default Value

By default, no monitoring alerts are created.

## References

1. <https://azure.microsoft.com/en-us/updates/classic-alerting-monitoring-retirement>
2. <https://docs.microsoft.com/en-in/azure/azure-monitor/platform/alerts-activity-log>
3. <https://docs.microsoft.com/en-in/rest/api/monitor/activitylogalerts/createorupdate>
4. <https://docs.microsoft.com/en-in/rest/api/monitor/activitylogalerts/listbysubscriptionid>
5. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-3-enable-logging-for-security-investigation>
