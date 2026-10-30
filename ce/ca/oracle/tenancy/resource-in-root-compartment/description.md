# Description

This policy identifies Oracle Tenancies that have CIS-scoped resources created directly in the root compartment.

## Rationale

Compartments are a foundational OCI governance control. They allow organizations to separate administrative ownership, apply least-privilege IAM policies, delegate operational responsibility, and organize resources by environment, application, business unit, or data sensitivity.

Creating resources directly in the root compartment weakens those guardrails because the root compartment is intended to represent the tenancy-wide administrative boundary. Overusing it makes policy scoping harder, increases the risk of excessive access, and reduces clarity when teams need to determine ownership and accountability for deployed resources.

Keeping benchmark-scoped resources out of the root compartment supports cleaner access boundaries and a more maintainable tenancy structure.

## Impact

Moving resources out of the root compartment can affect permissions, automation, monitoring targets, and application dependencies. Some OCI resources can be moved between compartments, while others may need to be recreated in the target compartment. Review IAM policies, tagging, automation, backup configuration, and workload dependencies before remediation.

## Audit

This policy evaluates related *Oracle Resource* records only for the CIS-scoped resource families included in the benchmark control:

- `Vcn`
- `Instance`
- `BootVolume`
- `Volume`
- `FileSystem`
- `Bucket`
- `AutonomousDatabase`
- `Database`
- `DbSystem`

This policy flags an *Oracle Tenancy* as `INCOMPLIANT` when any applicable related *Oracle Resource* has an empty `Compartment OCID`, which indicates that the resource is in the root compartment.

The tenancy is `COMPLIANT` when none of the applicable related resources are created in the root compartment.
