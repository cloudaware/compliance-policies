# Description

Amazon S3 provides an MFA Delete feature to add an extra layer of security when deleting objects from your S3 buckets. This feature requires additional authentication via MFA before allowing the deletion of objects, thereby reducing the risk of accidental or unauthorized deletions.

## Rationale

Not all S3 buckets need to have MFA Delete enabled. Typically, you might want to enable MFA Delete for buckets with critical or sensitive objects that require an additional layer of protection.

### Consider enabling MFA Delete for buckets with such objects as

- Critical Configuration Files
- Sensitive Customer Data
- Legal or Compliance Documents
- Highly Valuable Assets

Buckets with less critical or easily replaceable objects may not need MFA Delete enabled, but this decision should be based on your specific security and compliance requirements.

## Impact

Enabling MFA delete on an S3 bucket could required additional administrator oversight. Enabling MFA delete may impact other services that automate the creation and/or deletion of S3 buckets.

## Audit

This policy marks an object as `INCOMPLIANT` when `Versioning MFA Delete Enabled` boolean is set to `false`.

It's not possible to use MFA Delete with existing Lifecycle Configurations therefore, if an object has a Lifecycle Configuration, it will be marked as `INAPPLICABLE`.

An empty `Versioning Status` field indicates a possible permission issue with `s3:GetBucketVersioning` API call thus the object will be marked as `UNDETERMINED`.
