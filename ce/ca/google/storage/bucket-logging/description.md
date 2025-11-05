# Description

This policy identifies Google Cloud Storage Buckets that do not have logging enabled. Enabling logging ensures that all access requests to a bucket are recorded for audit and monitoring purposes.

## Rational

Cloud Storage logging captures detailed information about every request made to a bucket, including read, write, and delete operations on objects. These logs are critical for security auditing, monitoring access patterns, and investigating potential security incidents. Without logging, it becomes difficult to determine who accessed your data, when it was accessed, and from where.

## Impact

Enabling logging may incur additional costs for storing and processing logs.

## Audit

This policy flags a *Google Cloud Storage Bucket* as `INCOMPLIANT` if it does not have an associated `Logging Bucket`.

A Storage Bucket is marked as `INAPPLICABLE` if it has related *Log Source Buckets* indicating that it is already designated to store access logs.
