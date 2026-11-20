# Description

Create an activity log alert rule that notifies an action group whenever the activity log records the Create policy exemption operation in the Administrative category. The operation covers both new exemptions and changes to existing ones at or below the subscription scope.

## Rationale

A policy exemption removes a resource or scope from evaluation by a policy or initiative assignment, so a Deny effect stops blocking and an Audit effect stops reporting, while the assignment itself is unchanged. Compliance views then show the resource as Exempt rather than Non-compliant, which hides a deliberately weakened configuration from routine compliance review.

## Audit

This policy marks an *Azure Subscription* as `INCOMPLIANT` if no current enabled Activity Log Alert covers **Administrative / Microsoft.Authorization/policyExemptions/write**, has a resolved action group, and covers the subscription root. Category and operation must occur on their matching JSON fields, with no additional Level, Status, Caller, or other filter.

A qualifying alert makes the subscription `COMPLIANT`. Otherwise, unassessable alert configuration produces `UNDETERMINED`. Complex or narrower scope strings require manual review and do not prove subscription-wide coverage. Notification recipients and delivery must be verified operationally.
