# Description

This policy identifies AWS RDS Clusters that are not configured to copy resource tags to their snapshots. The check covers Aurora DB clusters, RDS Multi-AZ MySQL and PostgreSQL DB clusters, and Neptune DB clusters. When this setting is enabled, snapshots automatically inherit the tags applied to their parent cluster resources.

## Rationale

RDS snapshots incur ongoing storage costs. If snapshots do not inherit key tags such as *Department* or *Project*, it becomes difficult to accurately allocate and track these costs in billing and cost-management reports.

Many organizations rely on tags to classify and protect sensitive data (for example, `DataClassification: Restricted`). When tags are not copied to snapshots, backups may be excluded from automated security controls, monitoring processes, or data retention policies.

Additionally, IAM policies frequently use tag-based conditions (for example, `aws:ResourceTag/...`) to enforce access controls. Ensuring that tags are consistently applied to both primary database resources and their snapshots helps maintain uniform security permissions.

## Audit

This policy flags an *AWS RDS Cluster* as `INCOMPLIANT` when the `Copy Tags to Snapshot` setting is set to **false**.

*Clusters* that are **not in an available state** or that use the **Amazon DocumentDB** engine are marked as `INAPPLICABLE`.
