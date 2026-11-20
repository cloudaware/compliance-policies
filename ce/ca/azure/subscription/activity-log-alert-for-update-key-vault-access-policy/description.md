# Description

Create an activity log alert rule that notifies an action group whenever the activity log records the key vault Update Access Policy operation in the Administrative category. The alert fires only for vaults that use the vault access policy permission model.

## Rationale

On a vault that uses the access policy permission model, an access policy grants data plane permissions to keys, secrets and certificates, and any principal with key vault write permission, such as Contributor, can grant itself that access. An added or widened policy therefore exposes the vault's secrets while appearing as a routine vault change.

## Audit

This policy marks an *Azure Subscription* as `INCOMPLIANT` if no current enabled Activity Log Alert covers **Administrative / Microsoft.KeyVault/vaults/accessPolicies/write**, has a resolved action group, and covers the subscription root. Category and operation must occur on their matching JSON fields, with no additional Level, Status, Caller, or other filter.

A qualifying alert makes the subscription `COMPLIANT`. Otherwise, unassessable alert configuration produces `UNDETERMINED`. Complex or narrower scope strings require manual review and do not prove subscription-wide coverage. Notification recipients and delivery must be verified operationally.
