# Description

This policy identifies standalone Amazon RDS for MySQL, PostgreSQL, and MariaDB instances whose engine major version is outside AWS standard support. It uses the instance's collected AWS lifecycle calendar rather than a fixed version list or the latest release.

## Rationale

Running beyond standard support creates an upgrade obligation and can incur additional Extended Support charges. Extended Support provides temporary maintenance for eligible MySQL and PostgreSQL versions, with a published end date; it does not satisfy this policy's standard-support requirement. MariaDB has no RDS Extended Support option.

Findings require a tested major-version upgrade or a time-limited exception with verified support coverage. A finding during Extended Support does not mean that AWS has stopped providing all security fixes.

## Impact

Engine upgrades can change database behavior and require downtime. Test application compatibility, extensions, replication, backups, and the upgrade path before modifying production databases. Delaying migration can increase costs and leave less time before final support expiry or an AWS-initiated upgrade.

## Audit

This policy marks an *AWS RDS Instance* as `INCOMPLIANT` if its `Engine Lifecycle Support Info` shows that the **open-source-rds-standard-support** phase for its current `Engine` and `Engine Version Name` ended before the evaluation day.

An instance is `COMPLIANT` when the evaluation day is within its published standard-support period.

Instances are `INAPPLICABLE` when `Cluster` or `Cluster ARN` identifies cluster membership, or `Status` is **deleting**. Cluster members, including Aurora and Multi-AZ DB cluster members, are assessed by the [cluster engine support policy](../cluster-engine-support/description.md). Standalone Single-AZ and Multi-AZ DB instances and read replicas remain in scope. Stopped instances and other non-deleting states retain their support dependency; an ongoing upgrade does not prove that the current version has changed.

Only `Engine` values **mysql**, **postgres**, and **mariadb** are assessed. All other nonempty engine values are `INAPPLICABLE`, including commercial engines, separate services, and unrecognized or newly introduced engines; this exclusion does not establish their support status. Missing optional calendar enrichment is `INAPPLICABLE`, not proof of support; an empty collected array is an incomplete calendar and is `UNDETERMINED`.

## AWS lifecycle criteria

| Engine major version | Last day of RDS standard support | Last day of RDS Extended Support |
| --- | --- | --- |
| MySQL 5.7 | February 29, 2024 | June 30, 2029 |
| MySQL 8.0 | July 31, 2026 | July 31, 2029 |
| MySQL 8.4 | July 31, 2029 | July 31, 2032 |
| PostgreSQL 13 | February 28, 2026 | February 28, 2029 |
| PostgreSQL 14 | February 28, 2027 | February 28, 2030 |
| MariaDB 10.5 | August 31, 2026 | Not available |
| MariaDB 10.6 | December 31, 2026 | Not available |
