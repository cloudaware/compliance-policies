# Description

Create an activity log alert rule that notifies an action group whenever the activity log records the Create role assignment operation in the Administrative category. The rule covers role assignments made at the subscription scope and at every resource group and resource beneath it.

## Rationale

A role assignment grants a principal its permissions at the assigned scope, so a new Owner, Contributor or User Access Administrator assignment is a privilege escalation that changes no protected resource. Without an alert, the grant goes unnoticed until the next access review, and the new access can be used and removed before then.

## Audit

This policy marks an *Azure Subscription* as `INCOMPLIANT` if no current enabled Activity Log Alert covers **Administrative / Microsoft.Authorization/roleAssignments/write**, has a resolved action group, and covers the subscription root. Category and operation must occur on their matching JSON fields, with no additional Level, Status, Caller, or other filter.

A qualifying alert makes the subscription `COMPLIANT`. Otherwise, unassessable alert configuration produces `UNDETERMINED`. Complex or narrower scope strings require manual review and do not prove subscription-wide coverage. Notification recipients and delivery must be verified operationally.
