# Description

This policy identifies Oracle Tenancies that do not contain any active customer-managed compartments. Each tenancy should have at least one active customer-managed compartment so OCI resources can be organized under clear administrative and security boundaries instead of relying only on the root compartment or Oracle-managed compartments.

## Rationale

Compartments are a foundational OCI governance control. They provide clear boundaries for resource isolation, delegated administration, IAM policy scoping, quotas, tagging, and operational ownership. Creating dedicated compartments helps organizations separate workloads by environment, application, business unit, or data sensitivity.

When a tenancy does not have any active customer-managed compartments, teams are forced to rely on the root compartment or Oracle-managed compartments for resource organization. This weakens least-privilege administration, makes policy scoping less precise, and reduces clarity around ownership and accountability.

Establishing at least one active customer-managed compartment is a basic tenancy governance requirement and a prerequisite for building a scalable compartment strategy across environments, teams, and workloads.

## Impact

Introducing new compartments can require changes to IAM policies, automation, tagging, quotas, monitoring configuration, and operational procedures. Before remediation, confirm that administrators, service accounts, and deployment pipelines retain the access they need after workloads are reorganized.

## Audit

This policy flags an *Oracle Tenancy* as `INCOMPLIANT` when it does not have at least one related *Oracle Compartment* where `Lifecycle State` is `ACTIVE` and `Name` is not `ManagedCompartmentForPaaS`.

The tenancy is `COMPLIANT` when at least one related compartment meets both conditions.

Compartments whose `Lifecycle State` is not `ACTIVE` and the OCI-managed `ManagedCompartmentForPaaS` compartment are excluded from the evaluation.
