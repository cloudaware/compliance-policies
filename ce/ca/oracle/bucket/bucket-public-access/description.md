# Description

This policy identifies Oracle Storage Buckets that allow public access.

## Rationale

Public Object Storage buckets can expose stored objects to anonymous users without requiring Oracle Cloud authentication. If public access is enabled, data can be discovered, downloaded, or indexed outside the intended trust boundary, which increases the risk of data leakage and unauthorized disclosure.

Object Storage buckets should remain private unless there is a documented business requirement for public distribution and the bucket contains only data approved for public access.

## Impact

Disabling public access can interrupt workloads that intentionally serve objects directly from the bucket. Review application dependencies before changing the setting and use signed URLs, pre-authenticated requests, a CDN, or another controlled distribution pattern where public delivery is required.

## Audit

This policy flags an *Oracle Storage Bucket* as `INCOMPLIANT` when `Public Access Type` is set to **ObjectRead** or **ObjectReadWithoutList**.

The bucket is `COMPLIANT` when `Public Access Type` is set to **NoPublicAccess**.
