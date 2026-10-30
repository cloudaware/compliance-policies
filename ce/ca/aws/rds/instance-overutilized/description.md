# Description

This policy identifies Amazon RDS database instances that operate at high utilization levels, which may indicate that they are overburdened and require scaling or workload tuning to maintain optimal performance. An instance is flagged as overutilized when its 30-day average CPU utilization exceeds 90% and database connection or disk I/O metrics indicate workload activity.

## Rationale

Overutilized RDS database instances often struggle to meet workload demands, leading to degraded application performance and potential downtime. Proactively identifying these instances allows for timely resizing to a more appropriate instance class, ensuring optimal performance, reliability, and a better user experience for applications relying on the database.

## Impact

Scaling or resizing incurs additional costs. Implementing scaling strategies allows workloads to adapt dynamically to changing demand, preventing performance bottlenecks.

## Audit

This policy evaluates an *AWS RDS Instance* based on its 30-day performance metrics.

The *Instance* is marked as `INCOMPLIANT` if all the following criteria are met:

- `CloudWatch: CPU, 30-Day` is greater than 90%.
- At least one of the following workload activity indicators is present:
  - `CloudWatch: Database Connections Max,30d` is greater than 0.
  - `CloudWatch: Disk Read IOPS, 30-Day` is greater than 50 IOPS.
  - `CloudWatch: Disk Write IOPS, 30-Day` is greater than 50 IOPS.

The *Instance* is marked as `INAPPLICABLE` if it is **not** in an **available** `Status` or it has been running for less than 30 days.

The *Instance* is marked as `UNDETERMINED` if its `Status`, `Create Time`, `CloudWatch: CPU, 30-Day`, or all workload activity indicators are empty, indicating insufficient data in the CMDB to assess whether the instance is overutilized.
