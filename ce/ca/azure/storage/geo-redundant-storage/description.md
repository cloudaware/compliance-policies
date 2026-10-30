# Description

Verify that critical Azure Storage Accounts are configured with geo-redundant storage.

Azure Storage offers multiple replication options to enhance data durability and availability. Locally Redundant Storage (LRS) replicates data synchronously three times within a single physical location (i.e., a single data center), offering basic least expensive protection against hardware failures.

## Rationale

Although LRS provides resilience against local hardware issues such as drive or server rack failures, it does not offer protection against data center-wide disruptions—such as those caused by natural disasters, power outages, or large-scale equipment failures.

For critical storage accounts, use a geo-redundant replication option:

**Geo-Redundant Storage (GRS)**: Replicates data to a secondary geographic region.

**Read-Access Geo-Redundant Storage (RA-GRS)**: Provides read access to the secondary region.

**Geo-Zone-Redundant Storage (GZRS)** and **Read-Access Geo-Zone-Redundant Storage (RA-GZRS)**: Combine zone redundancy in the primary region with geo-redundancy to a secondary region.

## Impact

Transitioning from LRS to a more resilient replication tier may lead to increased costs. Furthermore, the manual migration process can introduce application downtime, depending on the volume of stored data and the target replication configuration.

When switching to a geo-redundant option (e.g., GRS or GZRS), an initial egress bandwidth charge is incurred as the entire storage account is replicated to the secondary region. Additionally, all subsequent write operations to the primary region will continue to generate egress bandwidth charges as part of the ongoing replication to the secondary region.

## Audit

This policy flags an *Azure Storage Account* as `INCOMPLIANT` if the Storage Account `SKU Name` does not represent GRS, RA-GRS, GZRS, or RA-GZRS.
