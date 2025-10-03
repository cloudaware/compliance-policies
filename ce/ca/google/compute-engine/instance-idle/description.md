# Description

This policy identifies Google Compute Engine (GCE) instances that appear to be idle. An instance is considered idle if it consistently meets the following low-utilization criteria over a 14-day period:

- Average CPU utilization below 5%
- Maximum CPU utilization below 15%
- Average network I/O less than 100 MB

## Rational

Idle instances generate costs without delivering business value. By identifying and addressing these instances, organizations can reduce unnecessary GCP spending and improve overall resource efficiency.

## Impact

Before terminating an instance, verify that it is not required for periodic tasks, disaster recovery, or other non-continuous workloads.

## Audit

This policy evaluates an Google GCE Instance based on its 14-day performance metrics.

The *Instance* is marked as `INCOMPLIANT` if all the following criteria are met:

- `CPU Utilization, Average, %` field is less than 5%.
- `CPU Utilization, Max, %` field is less than 15%.
- `Network In, Sum, Megabytes` field is less than 100 MB.
- `Network Out, Sum, Megabytes` field is less than 100 MB.

The *Instance* is marked as `INAPPLICABLE` if it is not currently running or it has been running for less than 14 days.

The *Instance* is marked as `UNDETERMINED` if any of the evaluated metrics are empty, indicating insufficient data in the CMDB to assess whether the instance is idle.
