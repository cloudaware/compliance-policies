# Description

This policy identifies Amazon Aurora MySQL DB clusters that do not have backtracking enabled.

Aurora backtracking lets administrators rewind a cluster to an earlier point in time within the configured backtrack window. Compared with restoring from a backup, backtracking can provide a faster recovery path for recent operational mistakes such as accidental deletes, incorrect updates, or failed deployment changes.

## Rationale

Enabling backtracking strengthens the recovery posture of supported Aurora MySQL workloads by reducing the time and effort required to reverse recent data changes. It complements automated backups by providing an additional recovery option when rapid rollback is needed after an application, administrative, or deployment error.

## Impact

Enabling backtracking can increase storage consumption and cost because Aurora retains additional change records for the configured backtrack window. Choose a window that aligns with your recovery objectives, workload change rate, and cost tolerance.

## Audit

This policy flags an *AWS RDS Cluster* as `INCOMPLIANT` when the `Backtrack Window` is **0** or less.

*Clusters* are marked as `INAPPLICABLE` if they are not in the **available** state or if the `Engine` value is not **aurora-mysql**.
