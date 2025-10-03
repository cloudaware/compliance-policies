# Description

This policy identifies Amazon RDS database instances that operate at high utilization levels that may be overburdened and require scaling or resizing to maintain optimal performance. An instance is flagged as overutilized if its average CPU utilization has exceeded 90% over the last 30 days.

## Rationale

Overutilized RDS database instances often struggle to meet workload demands, leading to degraded application performance and potential downtime. Proactively identifying these instances allows for timely resizing to a more appropriate instance class, ensuring optimal performance, reliability, and a better user experience for applications relying on the database.

## Impact

Scaling or resizing incurs additional costs. Implementing scaling strategies allows workloads to adapt dynamically to changing demand, preventing performance bottlenecks.

## Audit

This policy evaluates an *AWS RDS Instance* based on its 30-day performance metrics.

The *Instance* is marked as `INCOMPLIANT` if its `CPU Utilization, Average, %` metric is greater than 90%.

The *Instance* is marked as `INAPPLICABLE` if it is **not** in an **available** `Status` or it has been running for less than 30 days.

The *Instance* is marked as `UNDETERMINED` if any of the evaluated metrics are empty, indicating insufficient data in the CMDB to assess whether the instance is overutilized.
