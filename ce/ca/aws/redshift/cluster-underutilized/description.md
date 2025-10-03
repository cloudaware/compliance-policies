# Description

This policy identifies AWS Redshift Clusters that are consistently operating with low CPU utilization and disk I/O over the last 30 days, which may indicate that they are oversized for their current workload. A cluster is flagged as underutilized if it meets the following conditions:

1. Average CPU utilization has been below 20%.
2. Average disk read IOPS has been under 50.
3. Average disk write IOPS has been under 50.

## Rationale

Over-provisioning Redshift clusters results in unnecessary cloud costs. Identifying underutilized clusters enables you to make informed decisions about downsizing, leading to cost savings and ensuring that resources are better aligned with actual demand.

## Impact

Resizing a cluster may require scheduling a maintenance window and could result in temporary downtime.

## Audit

This policy evaluates an *AWS Redshift Cluster* based on its 30-day performance metrics.

The *Cluster* is marked as `INCOMPLIANT` if all the following criteria are met:

- `CloudWatch: CPU, 30-Day` metric is less than 20%.
- `CloudWatch: Disk Read IOPS, 30-Day` metric is less than 50 IOPS.
- `CloudWatch: Disk Write IOPS, 30-Day` metric is less than 50 IOPS.

The *Cluster* is marked as `INAPPLICABLE` if it is **not** in an **available** `Status` or it has been running for less than 30 days.

The *Cluster* is marked as `UNDETERMINED` if any of the evaluated metrics are empty, indicating insufficient data in the CMDB to assess whether the Cluster is underutilized.
