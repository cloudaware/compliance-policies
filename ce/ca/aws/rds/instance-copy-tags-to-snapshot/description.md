# Description

This policy identifies AWS RDS Instances that are not configured to copy instance tags to their snapshots. When this setting is enabled, snapshots automatically inherit the tags applied to their parent RDS database instances.

## Rationale

RDS snapshots incur ongoing storage costs. If snapshots do not inherit key tags such as *Department* or *Project*, it becomes difficult to accurately allocate and track these costs in billing and cost-management reports.

Many organizations rely on tags to classify and protect sensitive data (for example, `DataClassification: Restricted`). When tags are not copied to snapshots, backups may be excluded from automated security controls, monitoring processes, or retention policies.

In addition, IAM policies often use tag-based conditions (for example, `aws:ResourceTag/...`) to enforce access controls. Ensuring that tags are copied to snapshots helps maintain consistent security permissions between the primary database instance and its backups.

## Audit

This policy flags an *AWS RDS Instance* as `INCOMPLIANT` when the `Copy Tags to Snapshot` checkbox is set to **false**.

*Instances* that are **not in an available state**, or that **belong to an RDS cluster**, are marked as `INAPPLICABLE`.
