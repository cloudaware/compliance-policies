# Description

Create an activity log alert rule that notifies an action group whenever the activity log records the Delete role assignment operation in the Administrative category. The rule covers role assignments removed at the subscription scope and at every resource group and resource beneath it.

## Rationale

Deleting a role assignment removes a principal's access without touching any protected resource. An attacker can remove the assignments of legitimate administrators or responders to slow the response, or remove an assignment they granted themselves to hide the escalation, and neither change is visible until someone reviews the assignments.

## Audit

This policy marks an *Azure Subscription* as `INCOMPLIANT` if no current enabled Activity Log Alert covers **Administrative / Microsoft.Authorization/roleAssignments/delete**, has a resolved action group, and covers the subscription root. Category and operation must occur on their matching JSON fields, with no additional Level, Status, Caller, or other filter.

A qualifying alert makes the subscription `COMPLIANT`. Otherwise, unassessable alert configuration produces `UNDETERMINED`. Complex or narrower scope strings require manual review and do not prove subscription-wide coverage. Notification recipients and delivery must be verified operationally.
