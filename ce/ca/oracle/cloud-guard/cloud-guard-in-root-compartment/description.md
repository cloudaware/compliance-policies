# Description

This policy identifies Oracle Tenancies that do not have Oracle Cloud Guard enabled with an active target for the root compartment.

Oracle Cloud Guard provides security posture monitoring, detector rules, and responder capabilities for OCI resources. Configuring Cloud Guard at the root compartment helps ensure monitoring coverage starts at the tenancy boundary and includes resources across child compartments.

## Rationale

The root compartment is the top-level compartment for an OCI tenancy. If Cloud Guard is not enabled at this scope, security findings and automated response capabilities may be unavailable or incomplete for resources in the tenancy. This can create blind spots for misconfigurations, risky activity, and policy violations.

Enabling Cloud Guard for the root compartment provides a consistent baseline for tenancy-wide threat detection and security posture management.

## Impact

Cloud Guard may generate findings and responder activity that require operational review. Review detector and responder recipes before enabling automated responses in production environments.

## Audit

This policy flags an *Oracle Tenancy* as `INCOMPLIANT` when it does not have a related *Oracle Cloud Guard Target* that is both:

- `ACTIVE`
- Targeting the root compartment, identified by a target resource OCID that starts with `ocid1.tenancy.`

The policy returns `COMPLIANT` when at least one active Cloud Guard target monitors the root compartment.
