# Description

This policy identifies AWS RDS Aurora Clusters that are not configured for Multi-AZ deployment. In Amazon Aurora, Multi-AZ is achieved by provisioning at least one Aurora Replica in a different Availability Zone from the primary instance.

## Rationale

Multi-AZ deployment is a critical best practice for production database workloads. In the event of a primary instance failure, Amazon Aurora automatically fails over to an available Aurora Replica located in a separate AZ. While Aurora replicates data across multiple AZs at the storage layer by default, deploying instances across multiple AZs ensures resilience at the compute layer as well.

Failover typically completes within approximately 30 seconds, and because Aurora uses shared, distributed storage, the failover process does not result in data loss.

## Impact

Multi-AZ deployments may increase costs due to the additional compute resources required to maintain Aurora Replicas. However, for business-critical applications, the improved availability and reduced risk of downtime generally outweigh the associated costs.

## Audit

This policy flags an *AWS RDS Aurora Cluster* as `INCOMPLIANT` if the `Multi AZ` checkbox is set to **false**.

*Clusters* that are **not in an available state**, or that use an engine type other than **Aurora**, are marked as `INAPPLICABLE`.
