# Description

This policy identifies Amazon RDS Snapshots that are 90 days old or more.

## Rationale

Retaining database snapshots beyond their useful lifecycle can lead to unnecessary storage costs, particularly in environments with frequent backups. Regularly reviewing and removing outdated snapshots that are no longer required for business or compliance purposes supports both cost optimization and effective data lifecycle management.

## Impact

Deleting snapshots that are still required for disaster recovery or compliance may result in data loss. Always confirm the snapshot’s purpose before removal.

## Audit

This policy flags an *AWS RDS Snapshot* as `INCOMPLIANT` if its `Snapshot Create Time`, the timestamp marking snapshot creation, exceeds 90 days.

*RDS Snapshots* with a `State` other than **available** are marked as `INAPPLICABLE`.
