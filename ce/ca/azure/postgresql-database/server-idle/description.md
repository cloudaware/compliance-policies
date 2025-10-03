# Description

This policy identifies Azure PostgreSQL Servers that are potentially idle based on their performance metrics over the past 30 days. Idle servers are often provisioned at a higher tier than required, resulting in unnecessary cloud costs. A server is flagged as idle if its average CPU over the last 30 days is less than 5% and I/O utilization is 0%.

## Rationale

Over-provisioned servers increase expenses without delivering corresponding benefits. By identifying and decommissioning idle PostgreSQL servers helps reduce expenses and improve overall resource efficiency.

## Impact

Carefully review to confirm that the new configuration will accommodate peak demand. Note that resizing a server triggers a brief period of downtime while the change is applied.

## Audit

This policy evaluates an *Azure Azure PostgreSQL Server* based on its 30-day performance metrics.

The *Server* is marked as `INCOMPLIANT` if:

- `Monitor: CPU Percent, 30-Day` < 5%.

    and `Monitor: IO Consumption Percent, 30-Day` = 0%.

A *Server* is marked as `INAPPLICABLE` if it is not currently **Ready**.

The *Server* is marked as `UNDETERMINED` if the metrics are empty, indicating insufficient data in the CMDB to assess utilization.
