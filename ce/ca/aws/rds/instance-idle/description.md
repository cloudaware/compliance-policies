# Description

This policy identifies AWS RDS instances that appear to be idle based on their performance metrics over the past 30 days. An instance is considered idle if it meets all of the following criteria:

1. Average CPU utilization has been less than 5%.
2. Average Database Connections is zero.

## Rationale

Idle RDS instances generate costs without delivering business value. Identifying and decommissioning these resources can significantly reduce monthly AWS spend. Regular cleanup of unused resources also improves operational efficiency and reduces cloud management overhead.

## Audit

This policy evaluates an *RDS Instance* based on its 30-day performance metrics.

The *Instance* is marked as `INCOMPLIANT` if all the following criteria are met:

- `CloudWatch: CPU, 30-Day` metric is less than 5%.
- `CloudWatch: Database Connections, 30-Day` metric is zero.

The *Instance* is marked as `INAPPLICABLE` if it is **not** in an **available** `Status` or has been running for less than 30 days.

The *Instance* is marked as `UNDETERMINED` if any of the evaluated metrics are empty, indicating insufficient data in the CMDB to assess whether the instance is idle.
