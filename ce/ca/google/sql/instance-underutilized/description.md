# Description

This policy identifies Google Cloud SQL Instances that are underutilized. An instance is considered underutilized if, over the last 30 days, its average CPU utilization is below 20%, average memory utilization is below 40%, and average disk I/O operations are below 50 IOPS.

## Rationale

Overprovisioning database resources leads to unnecessary cloud costs and inefficient utilization of infrastructure. By detecting underutilized SQL instances, you can make informed rightsizing decisions, ensuring workloads are adequately supported while avoiding overspending on unused capacity.

## Impact

Performance data should be reviewed carefully before resizing to ensure changes do not negatively affect application availability, stability, or responsiveness.

## Audit

This policy evaluates an *Google Cloud SQL Instance* based on its 30-day performance metrics.

The *Instance* is marked as `INCOMPLIANT` if all the following criteria are met:

- `Metrics: CPU Utilization, 30-Day` < 20%.
- `Metrics: Memory Utilization, 30-Day` < 40%.
- `Metrics: Disk Read IO, OPS, 30-Day` < 50 IOPS.
- `Metrics: Disk Write IO, OPS, 30-Day` < 50 IOPS.

The *Instance* is marked as `INAPPLICABLE` if it is **not** in a **RUNNABLE** `State`, has been running for less than 30 days, or is already flagged as idle by the **Google Cloud SQL Instance is idle** [policy](../instance-idle/).

The *Instance* is marked as `UNDETERMINED` if the metrics are empty, indicating insufficient data in the CMDB to assess utilization.
