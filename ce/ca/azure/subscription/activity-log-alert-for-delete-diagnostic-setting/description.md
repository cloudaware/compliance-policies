# Description

Create an activity log alert rule that notifies an action group whenever the activity log records the Delete diagnostic setting operation in the Administrative category. Resource diagnostic settings and the subscription's activity log export setting share this operation name.

## Rationale

A diagnostic setting is what sends resource logs and the activity log to a workspace, storage account or event hub. Deleting one silently stops that export, which blinds the detections and retention that depend on it, and disabling cloud logs is a documented defense evasion technique used before acting on the resources those logs covered.

## Audit

This policy marks an *Azure Subscription* as `INCOMPLIANT` if no current enabled Activity Log Alert covers **Administrative / Microsoft.Insights/diagnosticSettings/delete**, has a resolved action group, and covers the subscription root. Category and operation must occur on their matching JSON fields, with no additional Level, Status, Caller, or other filter.

A qualifying alert makes the subscription `COMPLIANT`. Otherwise, unassessable alert configuration produces `UNDETERMINED`. Complex or narrower scope strings require manual review and do not prove subscription-wide coverage. Notification recipients and delivery must be verified operationally.
