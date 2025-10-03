# Description

This policy identifies AWS EBS Snapshots that are older than 90 days and should be evaluated for deletion or archival.

## Rationale

Regular review and management of aged EBS snapshots is an essential component of cloud resource hygiene. Unmanaged snapshots can accumulate over time, resulting in unnecessary storage costs. Additionally, retaining snapshots beyond their required lifecycle may increase security risks, complicate data management, and create compliance challenges.

## Impact

Snapshots must be carefully reviewed before removal to confirm they are not part of an active backup or retention strategy. Deleting a critical snapshot could result in irreversible data loss.

## Audit

This policy flags an *AWS EBS Snapshot* as `INCOMPLIANT` if its `Start Time`, the timestamp marking snapshot creation, exceeds 90 days.

*EBS Snapshots* with a `State` other than **completed** are marked as `INAPPLICABLE`.
