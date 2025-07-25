# Description

Ensure that AWS DataSync Tasks are configured to send transfer logs to Amazon CloudWatch Logs.

## Rationale

Enabling logging for DataSync Tasks provides visibility into data transfer operations.

## Impact

Enabling logging will may incur charges for Amazon CloudWatch Logs based on the amount of data ingested and stored.

## Audit

This policy marks an *AWS Data Sync Task* as `INCOMPLIANT` if the `Cloud Watch Log Group ARN` field is **empty** or the associated *Cloud Watch Log Group* does **not** exist in the CMDB.
