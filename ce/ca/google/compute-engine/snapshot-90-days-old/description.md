# Description

This policy identifies Google GCE Snapshots that are 90 days old or older. These snapshots are flagged for potential deletion or archival to optimize storage utilization and support effective data lifecycle management practices.

## Rationale

Stale snapshots can accumulate over time, generating unnecessary storage costs without providing meaningful value for disaster recovery or data restoration. By removing or archiving outdated snapshots, you can reduce their cloud storage footprint and lower monthly expenses.

## Impact

Failure to manage old snapshots results in ongoing storage charges for data that may no longer be relevant. Additionally, retaining a large number of outdated snapshots can complicate recovery processes by making it more difficult to identify the correct snapshot for restoration.

## Audit

This policy flags an *Google GCE Snapshot* as `INCOMPLIANT` if its `Creation Date` exceeds 90 days.

*GCE Snapshots* with a `Status` other than **READY** are marked as `INAPPLICABLE`.
