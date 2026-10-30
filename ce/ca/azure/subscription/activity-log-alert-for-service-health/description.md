# Description

Create an activity log alert for Service Health event.

## Rationale

Monitoring for Service Health events provides insight into service issues, planned maintenance, security advisories, and other changes that may affect the Azure services and regions in use.

## Impact

There is no charge for creating activity log alert rules.

## Audit

This policy flags an *Azure Subscription* as `INCOMPLIANT` if it does **not** have an enabled related *Azure Activity Log Alert* scoped to the subscription whose `Condition JSON` filters on **ServiceHealth**.

## Default Value

By default, no monitoring alerts are created.

## References

1. <https://learn.microsoft.com/en-us/azure/service-health/overview>
2. <https://learn.microsoft.com/en-us/azure/service-health/alerts-activity-log-service-notifications-portal>
3. <https://azure.microsoft.com/en-us/pricing/details/monitor/#faq>
4. <https://learn.microsoft.com/en-us/cli/azure/monitor/activity-log/alert>
5. <https://learn.microsoft.com/en-us/powershell/module/az.monitor/get-azactivitylogalert>
6. <https://learn.microsoft.com/en-us/powershell/module/az.monitor/new-azactivitylogalert>
