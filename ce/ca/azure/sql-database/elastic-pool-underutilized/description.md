# Description

This policy identifies Azure SQL Elastic Pools that are underutilized based on their performance metrics over the past 30 days. An Elastic Pool is flagged as underutilized if it meets the following criteria:

- **DTU-based pools**: Average DTU consumption is below 20% and average storage utilization is below 10%.
- **vCore-based pools**: Average CPU utilization is below 20% and average storage utilization is below 10%.

## Rationale

Oversized Elastic Pools lead to unnecessary cloud costs. Elastic Pools are intended to efficiently manage multiple databases with variable performance demands. However, consistently underutilized pools result in wasted resources and spending. Identifying and rightsizing these pools allows organizations to optimize costs while maintaining required performance levels for applications.

## Impact

Before resizing, it is essential to analyze historical performance data to ensure that the new configuration can handle periodic or seasonal peaks in workload demand. Excessive downsizing could result in performance bottlenecks.

## Audit

This policy evaluates an *Azure SQL Elastic Pool* based on its 30-day performance metrics.

The *Elastic Pool* is marked as `INCOMPLIANT` if any of the following criteria are met:

- `Monitor: DTU Consumption Percent, 30-Day` < 20%.

    and `Monitor: Storage Percent, 30-Day` < 10%.

- `Monitor: CPU Percent, 30-Day` < 20%.

    and `Monitor: Storage Percent, 30-Day` < 10%.

In case, `Monitor: DTU Consumption Percent, 30-Day` is empty.

A *Elastic Pool* is marked as `INAPPLICABLE` if it meets any of the following conditions:

- It is not currently **Ready**.
- It has been created within the last 30 days.

The *Elastic Pool* is marked as `UNDETERMINED` if both `Monitor: CPU Percent, 30-Day` metric is empty, indicating insufficient data in the CMDB to assess utilization.
