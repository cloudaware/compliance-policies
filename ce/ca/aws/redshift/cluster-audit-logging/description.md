# Description

This policy identifies AWS Redshift Clusters that do not have audit logging enabled. Audit logging allows you to track information about connections, user activity, and engine performance.

## Rationale

Enabling audit logging is a security best practice for data warehouses. It helps detect unauthorized access attempts or suspicious query patterns and supports investigation of performance issues or unexpected changes to the database schema.

Without audit logging, there is no historical record of who accessed the data or what actions were performed within the cluster.

## Audit

This policy flags an *AWS Redshift Cluster* as `INCOMPLIANT` if *Logging* is not `Enabled`.
