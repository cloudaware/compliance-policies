# Description

This policy identifies Google Cloud SQL Instances that are considered idle based on utilization metrics over the last 30 days. An instance is flagged as idle if its average CPU utilization is below 5% and it has an average of zero database connections.

## Rationale

Idle database instances consume resources and incur costs without delivering business value. Identifying and addressing these instances helps optimize cloud spending and ensures efficient resource utilization.

## Impact

Before taking any action, it is essential to validate the purpose of an instance to avoid unintended disruptions to applications or services.

## Audit

This policy evaluates a *Google Cloud SQL Instance* based on its 30-day performance metrics.

The *Instance* is marked as `INCOMPLIANT` if all the following criteria are met:

- `Metrics: CPU Utilization, 30-Day` metric is less than 5%.
- `Metrics: Cloud SQL Connections, 30-Day` metric is zero.

The *Instance* is marked as `INAPPLICABLE` if it is **not** in an **RUNNABLE** `State` or has been running for less than 30 days.

The *Instance* is marked as `UNDETERMINED` if any of the evaluated metrics are empty, indicating insufficient data in the CMDB to assess whether the instance is idle.
