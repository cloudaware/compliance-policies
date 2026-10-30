# Description

This policy identifies Oracle Storage Buckets that do not have object versioning enabled.

Object versioning is a bucket-level data protection feature in OCI Object Storage. When versioning is enabled, Object Storage keeps previous versions of objects after overwrite and delete operations, allowing authorized users to recover earlier versions when data is changed accidentally or maliciously.

## Rationale

Object Storage buckets can contain business-critical data, application artifacts, logs, and backups. Without object versioning, an overwrite or delete operation can permanently remove the previous object state, reducing recovery options during operational mistakes, application defects, or destructive activity.

Enable versioning for buckets that store important data so previous object versions remain available for recovery and investigation.

## Impact

Enabling object versioning increases storage usage because previous object versions are retained until explicitly deleted or removed by lifecycle policy. Review lifecycle management requirements and retention expectations before enabling versioning on buckets with high object churn.

## Audit

This policy flags an *Oracle Storage Bucket* as `INCOMPLIANT` when `Versioning` is **Disabled** or **Suspended**.

The bucket is `COMPLIANT` when `Versioning` is **Enabled**.

The policy returns `UNDETERMINED` when the versioning status is missing or contains an unexpected value.

## References

1. <https://docs.oracle.com/en-us/iaas/Content/Object/Tasks/usingversioning.htm>
2. <https://docs.oracle.com/en-us/iaas/tools/oci-cli/latest/oci_cli_docs/cmdref/os/bucket/update.html>
