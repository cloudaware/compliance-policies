# Description

This policy checks whether VPC Flow Logs are enabled and configured correctly for Google Cloud GCE subnetworks that support flow logging. VPC Flow Logs capture information about IP traffic going to and from network interfaces in a subnet and make that data available in Cloud Logging.

## Rationale

VPC Flow Logs provide visibility into network traffic for resources inside a subnet. They support network monitoring, traffic analysis, network forensics, and security investigations. Logging all traffic with detailed intervals, complete metadata, full sampling, and no filter helps preserve the context needed to investigate suspicious or unexpected activity.

## Impact

Enabling VPC Flow Logs can increase Cloud Logging, BigQuery, or Pub/Sub costs depending on the configured sinks and retained log volume.

## Audit

This policy flags a *Google GCE Subnetwork* as `INCOMPLIANT` when its `Purpose` is `PRIVATE` and any of the following conditions are met:

- `Flow Logs` is not set to **Enabled**.
- `Log Config State` is not set to **Enabled**.
- `Log Config Aggregation Interval` is not set to **INTERVAL_5_SEC**.
- `Log Config Flow Sampling` is not set to **1**.
- `Log Config Metadata` is not set to **INCLUDE_ALL_METADATA**.
- `Log Config Filter Expression` is set.

Subnetworks whose `Purpose` is not `PRIVATE` are marked as `INAPPLICABLE` because they do not support VPC Flow Logs.

## Default Value

By default, VPC Flow Logs are disabled when a new VPC subnetwork is created.

## References

1. <https://cloud.google.com/vpc/docs/using-flow-logs>
2. <https://cloud.google.com/vpc/docs/flow-logs>
