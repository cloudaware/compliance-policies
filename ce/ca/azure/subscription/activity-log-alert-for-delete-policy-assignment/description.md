# Description

Create an activity log alert for the Delete Policy Assignment event.

## Rationale

Monitoring for delete policy assignment events gives insight into changes done in "azure policy - assignments" and can reduce the time it takes to detect unsolicited changes.

## Audit

This policy evaluates *Azure Subscriptions* for the presence of an *Azure Activity Log Alert* that captures **Delete Policy Assignment** events. A subscription is marked as `INCOMPLIANT` if it does **not** have an *Activity Log Alert* whose `Condition JSON` filters on the **Microsoft.Authorization/policyAssignments/delete** operation.

## Default Value

By default, no monitoring alerts are created.

## References

1. <https://docs.microsoft.com/en-in/azure/azure-monitor/platform/alerts-activity-log>
2. <https://docs.microsoft.com/en-in/rest/api/monitor/activitylogalerts/createorupdate>
3. <https://docs.microsoft.com/en-in/rest/api/monitor/activitylogalerts/listbysubscriptionid>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-3-enable-logging-for-security-investigation>
5. <https://azure.microsoft.com/en-us/services/blueprints/>

## Additional Information

This log alert also applies for Azure Blueprints.
