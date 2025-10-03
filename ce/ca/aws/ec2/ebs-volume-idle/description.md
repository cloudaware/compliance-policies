# Description

This policy flags AWS EBS Volumes that are considered idle. A volume is flagged as **Idle** if it meets one of the following conditions:

1. It has been in an **available** state (unattached) for the past 30 days.
2. It is in an **in-use** state (attached to an instance) but has recorded **zero** or **null** read and write operations (`VolumeReadOps` and `VolumeWriteOps`) over the last 30 days.

## Rationale

EBS volumes incur storage costs regardless of whether they are not attached to an instance or actively utilized.

- **Unattached Volumes**: Volumes left in an **available** state often represent forgotten resources from decommissioned instances.
- **Attached but Inactive Volumes**: Volumes that remain attached but show no I/O activity may indicate they are no longer required, are remnants of incomplete configurations, or serve as secondary/failover disks that require explicit documentation and justification.

Identifying and addressing idle volumes helps reduce unnecessary monthly costs and improves cloud resource efficiency.

## Audit

This policy flags an *AWS EBS Volume* as `INCOMPLIANT` if:

1. The *Volume* `Status` is **available** and both `CloudWatch: Write OPS Sum, 30-Day` and `CloudWatch: Write OPS Sum, 30-Day` metrics are **empty**.
2. The *Volume* `Status` is **in-use** and both `CloudWatch: Write OPS Sum, 30-Day` and `CloudWatch: Write OPS Sum, 30-Day` metrics are either **empty** or **zero**.

The *EBS Volume* is marked as `INAPPLICABLE` if:

- Its `Status` is other than **in-use** or **available**.
- Its `Create Time` is less than 30 days ago.
- Its `Attachment Attach Time` is within the last 30 days.
