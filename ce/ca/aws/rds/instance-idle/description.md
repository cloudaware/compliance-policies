# Description

This policy identifies AWS RDS Instances that appear to be idle based on their performance metrics over the last 30 days. An instance is flagged as idle when it is available, has existed for at least 30 days, and meets all of the following criteria:

1. Average CPU utilization is below 5%.
2. Average database connections are zero.
3. Maximum database connections are zero.
4. Average disk read and write IOPS are below 1.

## Rationale

Idle RDS instances consume resources and incur costs without delivering business value. Identifying and addressing these resources helps reduce unnecessary AWS spend and improves operational efficiency.

## Impact

Review ownership, workload schedules, and dependencies before stopping, resizing, or deleting an instance. Some databases support infrequent batch jobs, reporting workloads, or standby processes that may not be visible in average CPU and connection metrics.

## Audit

This policy evaluates an *AWS RDS Instance* based on its 30-day performance metrics.

The *Instance* is marked as `INCOMPLIANT` if all the following criteria are met:

- `CloudWatch: CPU, 30-Day` is less than 5%.
- `CloudWatch: Database Connections, 30-Day` is less than or equal to 0.
- `CloudWatch: Database Connections Max,30d` is less than or equal to 0.
- `CloudWatch: Disk Read IOPS, 30-Day` is less than 1 IOPS.
- `CloudWatch: Disk Write IOPS, 30-Day` is less than 1 IOPS.

The *Instance* is marked as `INAPPLICABLE` if it is **not** in an **available** `Status` or has existed for less than 30 days.

The *Instance* is marked as `UNDETERMINED` if its `Status`, `Create Time`, or any evaluated metric is empty, indicating insufficient data in the CMDB to assess whether the instance is idle.
