# Description

Create an activity log alert for the Create Policy Assignment event.

## Rationale

Monitoring for create policy assignment events gives insight into changes done in "Azure policy - assignments" and can reduce the time it takes to detect unsolicited changes.

## Audit

This policy evaluates *Azure Subscriptions* for the presence of an *Azure Activity Log Alert* that captures **Create Policy Assignment** events. A subscription is marked as `INCOMPLIANT` if it does **not** have an *Activity Log Alert* whose `Condition JSON` filters on the **Microsoft.Authorization/policyAssignments/write** operation.

## Default Value

By default, no monitoring alerts are created.

## References

1. <https://azure.microsoft.com/en-us/updates/classic-alerting-monitoring-retirement>
2. <https://docs.microsoft.com/en-in/azure/azure-monitor/platform/alerts-activity-log>
3. <https://docs.microsoft.com/en-in/rest/api/monitor/activitylogalerts/createorupdate>
4. <https://docs.microsoft.com/en-in/rest/api/monitor/activitylogalerts/listbysubscriptionid>
5. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-3-enable-logging-for-security-investigation>
6. <https://docs.microsoft.com/en-in/rest/api/policy/policy-assignments>
7. <https://docs.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-log>
