# Description

This policy identifies Oracle Tenancies that do not have both required root-level default tags named `CreatedBy` and `CreatedOn`. In OCI, default tags configured at the tenancy root compartment are inherited by child compartments and help ensure supported resources receive baseline creation metadata during provisioning.

## Rationale

Default tags support consistent resource governance across the tenancy. Applying baseline creator and creation-time metadata at provisioning time improves accountability, operational traceability, inventory hygiene, and downstream reporting.

Configuring these defaults at the tenancy root compartment is the broadest and most maintainable approach because child compartments inherit the setting. This reduces reliance on manual tagging practices and helps establish a consistent tagging baseline across environments and teams.

When the required root-level default tags are missing, supported resources may be created without standard attribution metadata. That weakens governance controls and makes it harder to investigate ownership, review provisioning activity, and apply consistent operational processes.

## Impact

Adding or changing default tags can affect provisioning workflows, automation, IAM policy design, reporting logic, and any processes that validate or depend on tag values. Before remediation, confirm that the required tag namespace, tag definitions, default values, and permissions align with your tenancy tagging standard.

## Audit

This policy flags an *Oracle Tenancy* as `INCOMPLIANT` when at least one required root-level default tag is missing.

The tenancy is `COMPLIANT` when it has both required root-level default tags: `TagDefault` for `CreatedBy` and `TagDefault` for `CreatedOn`.

This policy evaluates related *Oracle Resource* records only when all of the following conditions are met:

- `Resource Type` is `TagDefault`,
- `Compartment OCID` is empty, which indicates the tenancy root compartment,
- `Name` is `createdby` or `createdon`.

Oracle resources that are not `TagDefault` resources, `TagDefault` resources outside the root compartment, and root-level `TagDefault` resources with names other than `createdby` or `createdon` are excluded from the evaluation.
