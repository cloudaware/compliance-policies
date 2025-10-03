# Description

This policy identifies Amazon RDS database instances that appear to be underutilized based on their performance metrics over the last 30 days. An instance is flagged as underutilized if it meets the following conditions:

1. Average CPU utilization has been below 20%.
2. Average disk read IOPS has been under 50.
3. Average disk write IOPS has been under 50.

## Rationale

Right-sizing underutilized RDS instances helps reduce costs while maintaining application performance. Aligning resources with actual workload requirements ensures efficient use of infrastructure and prevents unnecessary spend.

## Impact

It is crucial to analyze performance data carefully before resizing to avoid any negative impact on application availability or responsiveness.

## Audit

This policy evaluates an *RDS Instance* based on its 30-day performance metrics.

The *Instance* is marked as `INCOMPLIANT` if all the following criteria are met:

- `CloudWatch: CPU, 30-Day` metric is less than 20%.
- `CloudWatch: Disk Read IOPS, 30-Day` metric is less than 50 IOPS.
- `CloudWatch: Disk Write IOPS, 30-Day` metric is less than 50 IOPS.

The *Instance* is marked as `INAPPLICABLE` if it is **not** in an **available** `Status`, it has been running for less than 30 days, or is already flagged as idle by the **AWS RDS Instance is idle** policy.

The *Instance* is marked as `UNDETERMINED` if any of the evaluated metrics are empty, indicating insufficient data in the CMDB to assess whether the instance is underutilized.
