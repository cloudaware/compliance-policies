# Description

Ensure that Azure Managed Disk snapshots are stored on cost-effective Standard-tier storage rather than Premium SSDs. Premium SSDs are designed for performance-intensive workloads, whereas snapshots are typically used for point-in-time backups and disaster recovery scenarios that do not require high performance or low-latency access.

## Rationale

Premium SSDs are engineered to deliver high IOPS and throughput for latency-sensitive production workloads. However, these performance characteristics are not required for snapshots, which primarily serve as backup and recovery artifacts.

By utilizing Standard HDD or Standard SSD storage tiers, you can significantly reduce snapshot storage costs without compromising data durability or recovery capabilities.

## Audit

This policy flags *Azure Snapshots* as `INCOMPLIANT` if the `Disk SKU Name` contains the keyword **Premium**, indicating that the snapshot resides on Premium SSDs Managed Disk storage.
