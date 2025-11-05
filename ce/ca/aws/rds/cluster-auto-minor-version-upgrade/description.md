# Description

This policy identifies AWS RDS Multi-AZ Clusters where the Auto Minor Version Upgrade feature is disabled.

## Rationale

Enabling automatic minor version upgrades ensures that clusters receive the latest engine updates, which may include critical security patches, bug fixes, and performance improvements. For Multi-AZ clusters designed to provide high availability, maintaining consistent updates across all instances is essential for stability, security, and uniform behavior, particularly during failover events.

## Audit

This policy flags a Multi-AZ *AWS RDS Cluster* as `INCOMPLIANT` if the `Auto Minor Version Upgrade` field is set to **No**.

A *Cluster* is marked as `INAPPLICABLE` if the `Multi-AZ` field is set to **false**.
