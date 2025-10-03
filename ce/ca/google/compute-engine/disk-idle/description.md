# Description

This policy identifies GCE persistent disks that are not attached to any Compute Engine instance and have remained unused for more than 30 days.

## Rationale

Unattached persistent disks can accumulate in a project, leading to unnecessary storage costs if left unmanaged.

## Impact

Before deleting a disk, confirm that it is not reserved for future use, retained for compliance purposes, or required for backup and disaster recovery. Deleting disks without validation may result in irreversible data loss.

## Audit

This policy marks a *Google GCE Disk* as **INCOMPLIANT** if:

* The disk doesn't have a related *Google GCE Attached Disk*.
* The disk's `lastAttachTimestamp` is empty.
* The `lastDetachTimestamp` is more than **30 days old**.

*Disks* of `Type` **SCRATCH**  are marked as `INAPPLICABLE`.
