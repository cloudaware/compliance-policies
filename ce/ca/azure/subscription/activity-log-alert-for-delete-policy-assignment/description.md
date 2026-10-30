# Description

Create an activity log alert for the Delete Policy Assignment event.

## Rationale

Monitoring for delete policy assignment events gives insight into changes done in "azure policy - assignments" and can reduce the time it takes to detect unsolicited changes.

## Audit

This policy flags an *Azure Subscription* as `INCOMPLIANT` if it does **not** have an enabled related *Azure Activity Log Alert* scoped to the subscription whose `Condition JSON` filters on the **Administrative** category and the **Microsoft.Authorization/policyAssignments/delete** operation.

## Default Value

By default, no monitoring alerts are created.

## References

1. <https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-create-activity-log-alert-rule>
2. <https://learn.microsoft.com/en-us/rest/api/monitor/activity-log-alerts/create-or-update>
3. <https://learn.microsoft.com/en-us/rest/api/monitor/activity-log-alerts/list-by-subscription-id>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-3-enable-logging-for-security-investigation>
5. <https://azure.microsoft.com/en-us/products/blueprints/>

## Additional Information

This log alert also applies for Azure Blueprints.
