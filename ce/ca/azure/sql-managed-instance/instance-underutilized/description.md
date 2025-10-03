# Description

This policy identifies Azure SQL Managed Instances that are underutilized based on their performance metrics over the past 30 days. An instance is considered underutilized if its average CPU utilization is below 20% and both its average disk read and write I/O are below 50 MB.

## Rationale

Running underutilized SQL Managed Instances results in unnecessary cloud expenditure. By identifying these instances, organizations can make informed decisions to rightsize resources, ensuring performance meets workload demands while minimizing costs.

## Impact

It is essential to carefully analyze historical performance trends before resizing to avoid negatively impacting application performance.

## Audit

This policy evaluates an *Azure SQL Managed Instance* based on its 30-day performance metrics.

The *Managed Instance* is marked as `INCOMPLIANT` if:

- `Monitor: Average CPU Percent, 30-Day` < 20%.

    and `Monitor: IO Read, MB, 30-Day` < 50 MB.

    and `Monitor: IO Written, MB, 30-Day` < 50 MB.

A *Managed Instance* is marked as `INAPPLICABLE` if it is not currently **Ready**.

The *Managed Instance* is marked as `UNDETERMINED` if the metrics are empty, indicating insufficient data in the CMDB to assess utilization.
