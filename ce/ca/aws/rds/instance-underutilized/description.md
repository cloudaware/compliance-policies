# Description

This policy identifies Amazon RDS Instances that appear to be underutilized based on their performance metrics over the last 30 days. An instance is flagged as underutilized when it is available, has existed for at least 30 days, and meets the following conditions:

1. Average CPU utilization is below 20%.
2. Average disk read IOPS is below 50.
3. Average disk write IOPS is below 50.
4. Average database connections are below 5.
5. Maximum database connections do not exceed 20.

Instances that meet the idle-instance criteria, including near-zero disk I/O, are evaluated by the **AWS RDS Instance is idle** policy instead.

## Rationale

Right-sizing underutilized RDS instances helps reduce costs while maintaining application performance. Aligning resources with actual workload requirements improves infrastructure efficiency and prevents unnecessary spend.

## Impact

Review performance data and workload patterns carefully before resizing. An overly aggressive downsize can affect database availability, stability, or responsiveness.

## Audit

This policy evaluates an *AWS RDS Instance* based on its 30-day performance metrics.

The *Instance* is marked as `INCOMPLIANT` if all the following criteria are met:

- `CloudWatch: CPU, 30-Day` is less than 20%.
- `CloudWatch: Disk Read IOPS, 30-Day` is less than 50 IOPS.
- `CloudWatch: Disk Write IOPS, 30-Day` is less than 50 IOPS.
- `CloudWatch: Database Connections, 30-Day` is less than 5.
- `CloudWatch: Database Connections Max,30d` is less than or equal to 20.

The *Instance* is marked as `INAPPLICABLE` if it is **not** in an **available** `Status`, it has been running for less than 30 days, or is already flagged as idle by the **AWS RDS Instance is idle** policy.

The *Instance* is marked as `UNDETERMINED` if its `Status`, `Create Time`, or any evaluated metric is empty, indicating insufficient data in the CMDB to assess whether the instance is underutilized.
