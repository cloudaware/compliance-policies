# Description

Create an activity log alert for Service Health event.

## Rationale

Monitoring for Service Health events provides insight into service issues, planned maintenance, security advisories, and other changes that may affect the Azure services and regions in use.

## Impact

There is no charge for creating activity log alert rules.

## Audit

This policy marks an *Azure Subscription* as `INCOMPLIANT` if no current enabled *Activity Log Alert* covers category **ServiceHealth**, with all event types, services and regions across the subscription with a resolved action group and no additional condition filters. Field/value pairs must occur in the same condition.

A qualifying alert makes the subscription `COMPLIANT`. Otherwise, unassessable alert configuration produces `UNDETERMINED`.

## Default Value

By default, no monitoring alerts are created.

## References

1. <https://learn.microsoft.com/en-us/azure/service-health/overview>
2. <https://learn.microsoft.com/en-us/azure/service-health/alerts-activity-log-service-notifications-portal>
3. <https://azure.microsoft.com/en-us/pricing/details/monitor/#faq>
4. <https://learn.microsoft.com/en-us/cli/azure/monitor/activity-log/alert>
5. <https://learn.microsoft.com/en-us/powershell/module/az.monitor/get-azactivitylogalert>
6. <https://learn.microsoft.com/en-us/powershell/module/az.monitor/new-azactivitylogalert>
