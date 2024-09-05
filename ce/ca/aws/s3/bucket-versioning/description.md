# Description

Make sure to enable the Amazon S3 bucket versioning.

Amazon S3 bucket versioning is a feature that enhances the resiliency and security of your data by enabling the storage of multiple versions of objects within the same bucket. This functionality provides a mechanism for preserving, retrieving, and restoring every version of every object stored in the bucket.

## Rational

When enabled, this feature allows you to keep multiple versions of an object in the same S3 bucket. Each version is assigned a unique version ID, providing a robust version control mechanism for your stored data by allowing users to keep track of changes and maintain a history of modifications.

## Impact

By leveraging versioning, users can maintain control over their stored objects, reduce the risk of data loss, and meet various compliance and regulatory requirements.

Disabled S3 bucket versioning can lead to increased risk of data loss. Any accidental deletion or overwrite of an object can result in permanent data loss, as there are no previous versions to recover.

## Audit

This policy marks an object as `INCOMPLIANT` when `Versioning Status` is `Off` or `Suspended`.

An empty `Versioning Status` field indicates a possible permission issue with `s3:GetBucketVersioning` API call thus the object will be marked as `UNDETERMINED`.
