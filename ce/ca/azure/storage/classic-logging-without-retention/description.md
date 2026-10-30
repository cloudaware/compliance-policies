# Description

Ensure that every Azure Storage Blob, Queue, or Table service with classic Storage
Analytics logging enabled has an enabled, positive retention period. The policy does
not prescribe a maximum number of retention days.

## Rationale

Classic Storage Analytics logging records service requests in the storage account.
Without retention, those logs can accumulate indefinitely and increase storage costs.
Setting a bounded retention period keeps the logging needed for operations and
investigations while limiting unplanned growth.

## Impact

When the retention period expires, Azure permanently deletes the corresponding
classic log records. Before reducing or enabling retention, confirm audit,
security-investigation, legal-hold, backup, and recovery requirements. Export logs
to an appropriate destination if they must be retained for longer.

## Audit

This policy marks an *Azure Storage Account* as `INCOMPLIANT` when at least one
classic Blob, Queue, or Table logging operation is enabled and the matching service
has retention disabled or a retention period of zero days or fewer.

The policy is `INAPPLICABLE` when no classic logging operation is enabled. It is
`UNDETERMINED` when the logging or retention configuration cannot be interpreted.
It is `COMPLIANT` only when every service with enabled classic logging has retention
enabled for a positive number of days.

## References

1. <https://learn.microsoft.com/en-us/rest/api/storageservices/about-storage-analytics-logging>
2. <https://learn.microsoft.com/en-us/cli/azure/storage/logging?view=azure-cli-latest>
