# Description

This policy identifies Google Storage Bucket used as destinations for Cloud Logging sinks that do not have **Object Versioning** enabled.

## Rationale

Log data is essential for security auditing, incident response, and operational troubleshooting. Storing logs in a Cloud Storage bucket without Object Versioning introduces the risk of data loss—if a log object is overwritten or deleted, whether accidentally or maliciously, it cannot be recovered.

Enabling Object Versioning ensures that all previous versions of log objects are retained. This provides a reliable safeguard, allowing recovery of prior log versions when necessary and maintaining the integrity and continuity of your audit trail.

## Impact

Enabling Object Versioning may increase storage costs due to the retention of multiple object versions.

## Audit

This policy flags a *Google Storage Bucket* as `INCOMPLIANT` if it has `Versioning Enabled` checkbox set to **false** and the Bucket has a related *Google Logging Log Sink* as its log destination.
