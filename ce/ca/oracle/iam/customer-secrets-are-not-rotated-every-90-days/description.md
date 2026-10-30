# Description

This policy identifies Oracle IAM customer secret keys that were created more than 90 days ago.

## Rationale

Oracle IAM customer secret keys are used by Amazon S3-compatible clients to authenticate to OCI Object Storage. These credentials do not expire automatically, so an exposed or forgotten key can continue to provide access until it is deleted or replaced. Rotating customer secret keys on a defined schedule reduces the amount of time a compromised key can be used, helps remove stale credentials from applications and integrations, and supports regular validation of who still requires S3-compatible Object Storage access.

## Impact

Rotating a customer secret key can disrupt applications, integrations, or users that still depend on the old key. Create a replacement key, update all dependent workloads, and confirm Object Storage access before deleting the stale key.

## Audit

This policy flags an *Oracle IAM Customer Secret* as `INCOMPLIANT` if the `Time Created` field is more than 90 days old.
