# Description

Identify Azure Managed Disk Snapshots that are 90 days old or older to optimize storage utilization and uphold data lifecycle management practices by flagging snapshots for potential deletion or archival.

## Rationale

Snapshots that exceed 90 days in age may contribute to unnecessary storage costs. Regular review and lifecycle management of such resources support cost efficiency and improve data hygiene. Archiving or deleting outdated snapshots helps ensure a well-governed and optimized cloud infrastructure.

## Impact

You should assess the business and compliance requirements for retaining snapshots beyond 90 days. Some regulatory or operational policies may necessitate extended retention. Actions taken (i.e., deletion or archival) must align with internal data retention and governance policies.

## Audit

This policy marks an *Azure Snapshot* as `INCOMPLIANT` if the value in its `Time Created` field indicates a creation date 90 days or more in the past, relative to the current date.
