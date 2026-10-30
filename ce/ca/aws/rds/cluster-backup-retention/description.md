# Description

This policy identifies AWS RDS DB clusters that retain automated backups for fewer than 7 days.

Automated backups support point-in-time recovery and help restore cluster-based database services after accidental changes, data corruption, operational mistakes, or service disruption. A short retention window reduces the number of recent restore points that are available when an incident occurs.

## Rationale

Maintaining at least 7 days of backup retention improves resilience by preserving a sufficient recovery window for investigation, rollback, and restoration activities. This is particularly important for business-critical database workloads where recovery objectives depend on having recent restore points readily available.

## Impact

Increasing the backup retention period can increase backup storage costs. Organizations should balance retention costs against recovery requirements, data criticality, and internal resilience standards.

## Audit

This policy flags an *AWS RDS Cluster* as `INCOMPLIANT` when the `Backup Retention Period` is less than **7** days.

*Clusters* are marked as `INAPPLICABLE` if they are not in the **available** state or if the `Engine` value is not one of the following cluster engines:

- **aurora-mysql**
- **aurora-postgresql**
- **mysql**
- **postgres**
- **docdb**
- **neptune**
