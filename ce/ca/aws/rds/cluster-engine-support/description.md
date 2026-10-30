# Description

This policy identifies Amazon RDS and Aurora DB clusters whose actual engine major version is outside AWS standard support. It evaluates Aurora MySQL, Aurora PostgreSQL, and RDS for MySQL/PostgreSQL Multi-AZ DB clusters once per cluster, using the AWS lifecycle calendar collected for the cluster's **Engine** and **Engine Version Name**.

## Rationale

Remaining within standard support provides normal AWS engine maintenance and avoids dependence on paid RDS Extended Support. The actionable finding is to plan a tested major-version upgrade or approve a temporary exception with verified support coverage and costs. A version in Extended Support fails this standard-support requirement but can still receive critical security and bug fixes; it must not be described as entirely unsupported.

This is a major-version lifecycle check. A version does not fail merely because a newer major or minor version exists. Minor-version retirement, patch eligibility, and automatic minor upgrades require separate checks.

## Impact

Engine upgrades can interrupt connections and change query behavior, extensions, or replication compatibility. Test the application and upgrade path, verify backups and recovery, and plan the change before upgrading a production cluster.

## Audit

This policy marks an *AWS RDS Cluster* as `INCOMPLIANT` if its **Engine Lifecycle Support Info** calendar contains a single **open-source-rds-standard-support** phase whose **LifecycleSupportEndDate** is before the current UTC date. Findings distinguish a published **open-source-rds-extended-support** period, expiry of the final published support period, and a calendar with no Extended Support period.

A cluster is `COMPLIANT` when the current UTC date is within the calendar's standard support period, including its final day. There is no version allowlist: future versions of an in-scope engine become compliant automatically when their collected AWS calendar confirms standard support, without a policy update. The policy selects phases by **LifecycleSupportName**, independently of array order and the **Engine Lifecycle Support** enrollment setting. The calendar describes major-version support availability; it does not prove enrollment, minor-version eligibility, entitlement, or actual charges.

A cluster is `INAPPLICABLE` when **Status** is **deleting**, when optional lifecycle enrichment is absent or an empty JSON array, or when **Engine** is outside **aurora-mysql**, **aurora-postgresql**, **mysql**, and **postgres**. Engines outside this scope, including Neptune, DocumentDB, and legacy **aurora**, are excluded from automated lifecycle coverage, not declared supported.

### AWS lifecycle criteria

| Engine major version | End of standard support | End of Extended Support |
| --- | --- | --- |
| Aurora MySQL 2 (MySQL 5.7 compatible) | October 31, 2024 | June 30, 2029 |
| Aurora MySQL 3 (MySQL 8.0 compatible) | April 30, 2028 | July 31, 2029 |
| RDS for MySQL 8.0 | July 31, 2026 | July 31, 2029 |
| Aurora PostgreSQL 13 | February 28, 2026 | February 28, 2029 |
