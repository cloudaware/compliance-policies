# Description

A tenant places each new subscription under one of two scopes: the root management group, or another management group the organization designates. The Default management group hierarchy setting selects between them for the whole tenant. Prerequisites: Create the management group that will receive new subscriptions and assign it the policies and role assignments that new subscriptions must carry.

## Rationale

With the root management group as the default, a new subscription inherits only root- scope policy and role assignments, which organizations often keep minimal because they reach every resource in the tenant. Resources deployed before the subscription is moved run without the organization's guardrails, and compliance reporting scoped to child management groups does not cover them.

## Audit

This requirement needs manual assessment. Tenant default management-group setting is not collected; current subscription membership does not establish the default for new subscriptions.
