# Description

Identify Amazon EC2 instances operating at high utilization levels that may be overburdened and require scaling or resizing to maintain optimal performance. Overutilized instances exhibit average CPU utilization above 80%, frequent CPU spikes above 95%. These criteria help pinpoint instances at risk of impacting workloads due to resource exhaustion.

## Rational

Overutilized EC2 instances often struggle to meet workload demands, leading to degraded application performance and potential downtime. Addressing overutilized instances ensures workloads remain responsive and scalable under peak demands. Remediation actions such as vertical or horizontal scaling enable improved performance and align resources with operational requirements, reducing the risk of performance bottlenecks.

## Impact

Scaling or resizing incurs additional costs. Implementing scaling strategies allows workloads to adapt dynamically to demand changes.

## Audit

This policy evaluates an EC2 instance based on its 14-day performance metrics.

The instance is marked as `INCOMPLIANT` if all the following criteria are met:

- `CPU Utilization, Average, %` field is greater than 80%.
- `CPU Utilization, Max, %` field is greater than 95%.

The instance is marked as `INAPPLICABLE` if it is not currently running or it has been running for less than 14 days.

The instance is marked as `UNDETERMINED` if any of the evaluated metrics are empty, indicating insufficient data in the CMDB to assess whether the instance is overutilized.
