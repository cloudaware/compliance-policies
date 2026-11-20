# Description

Create an activity log alert for the Delete Policy Assignment event.

## Rationale

Monitoring for delete policy assignment events gives insight into changes done in "azure policy - assignments" and can reduce the time it takes to detect unsolicited changes.

## Audit

This policy marks an *Azure Subscription* as `INCOMPLIANT` if no current enabled Activity Log Alert covers **Administrative / Microsoft.Authorization/policyAssignments/delete**, has a resolved action group, and covers the subscription root. Category and operation must occur on their matching JSON fields, with no additional Level, Status, Caller, or other filter.

A qualifying alert makes the subscription `COMPLIANT`. Otherwise, unassessable alert configuration produces `UNDETERMINED`. Complex or narrower scope strings require manual review and do not prove subscription-wide coverage. Notification recipients and delivery must be verified operationally.
