# Description

Create an activity log alert rule that notifies an action group whenever the activity log records the Delete management locks operation in the Administrative category. The operation covers resource locks on the subscription, its resource groups and individual resources.

## Rationale

A CanNotDelete or ReadOnly lock blocks deletion or modification for every user regardless of role, so removing it is the step that comes before deleting or overwriting a locked resource. Without an alert, the lock removal and the destructive change that follows can happen minutes apart with no notification in between.

## Audit

This policy marks an *Azure Subscription* as `INCOMPLIANT` if no current enabled Activity Log Alert covers **Administrative / Microsoft.Authorization/locks/delete**, has a resolved action group, and covers the subscription root. Category and operation must occur on their matching JSON fields, with no additional Level, Status, Caller, or other filter.

A qualifying alert makes the subscription `COMPLIANT`. Otherwise, unassessable alert configuration produces `UNDETERMINED`.
