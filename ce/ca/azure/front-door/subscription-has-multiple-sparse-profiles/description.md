# Description

This policy identifies Azure subscriptions with multiple provisioned Azure Front Door Standard or Premium profiles that each contain exactly one provisioned endpoint. These profiles can be candidates for a consolidation review.

## Rationale

Azure Front Door profiles define a management boundary for endpoints, routes, domains, origin groups, rulesets, Web Application Firewall policies, and diagnostics. Multiple singleton profiles can duplicate configuration and operational effort. Where workloads have compatible tier, security, routing, and ownership requirements, consolidating them can simplify management and may reduce costs.

## Impact

This is a review finding, not a directive to merge profiles. Consolidation can affect custom-domain validation, DNS, TLS certificates, routing, Web Application Firewall coverage, logging, access controls, and availability. Moving a workload between profiles requires a planned migration and rollback path.

## Audit

This policy evaluates Azure Front Door profiles in an *Azure subscription*.

An eligible profile has a provisioning state of `Succeeded` and a SKU of
`Standard_AzureFrontDoor` or `Premium_AzureFrontDoor`. A provisioned endpoint has
a provisioning state of `Succeeded`.

The *Azure subscription* is marked as `INCOMPLIANT` when at least two eligible
profiles each have exactly one provisioned endpoint.

The *Azure subscription* is marked as `INAPPLICABLE` when it has fewer than two
eligible profiles.

The *Azure subscription* is marked as `UNDETERMINED` when profile or endpoint
data required for evaluation is unavailable, unless the policy has already
conclusively identified two singleton profiles.

Otherwise, the *Azure subscription* is marked as `COMPLIANT` because fewer than
two eligible profiles have exactly one provisioned endpoint.
