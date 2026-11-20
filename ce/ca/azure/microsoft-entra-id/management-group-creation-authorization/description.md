# Description

A tenant permits management group creation under one of two rules: any user or service principal in the tenant, or only principals granted management group write permission on the root management group. The Require write permissions for creating new management groups setting selects between them. Prerequisites: Grant management group write permission on the root management group to every user and pipeline identity that must continue to create management groups.

## Rationale

With the setting off, any user or service principal in the tenant can create a management group under the root or default management group and receives the Owner role on it. A compromised low-privilege account thereby gains a persistent privileged scope in the hierarchy, holding Owner over any subscription later placed in that management group.

## Audit

This requirement needs manual assessment. Tenant requireAuthorizationForGroupCreation is not collected.
