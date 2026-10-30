# Description

Identify Amazon EC2 instances operating at high utilization levels that may be overburdened and require scaling or resizing to maintain optimal performance. Overutilized instances exhibit average CPU and memory utilization above 80% with frequent CPU spikes above 95%. These criteria help pinpoint instances at risk of impacting workloads due to resource exhaustion.

## Rationale

Overutilized EC2 instances often struggle to meet workload demands, leading to degraded application performance and potential downtime. Addressing overutilized instances ensures workloads remain responsive and scalable under peak demands. Remediation actions such as vertical or horizontal scaling enable improved performance and align resources with operational requirements, reducing the risk of performance bottlenecks.

## Impact

Scaling or resizing incurs additional costs. Implementing scaling strategies allows workloads to adapt dynamically to demand changes.

## Audit

This policy evaluates an *AWS EC2 Instance* over the last 14 days using CPU and memory metrics.

Memory is evaluated in this order:

- If `New Relic Host` is present, use `New Relic Host: Memory Used, 14-Day`.
- Otherwise, use `CloudWatch (Agent): Memory Used, 14-Day`.
- If that metric is empty, use `Nagios: Memory Utilization`.
- If all memory metrics are empty, fall back to CPU only.

The instance is marked as `INCOMPLIANT` when all of these baseline conditions are true:

- `CloudWatch: CPU, 14-Day` is greater than 80%.
- `CloudWatch: CPU Max, 14-Day` is greater than 95%.

And one of these metric paths applies if present:

- `New Relic Host` is present and `New Relic Host: Memory Used, 14-Day` is greater than 80%.
- `CloudWatch (Agent): Memory Used, 14-Day` is greater than 80%.
- `Nagios: Memory Utilization` is greater than 80%.

The instance is marked as `INAPPLICABLE` if it is not currently running or has been running for less than 14 days.

The instance is marked as `UNDETERMINED` if either required CPU metric is empty, or if `New Relic Host` is present but `New Relic Host: Memory Used, 14-Day` is empty.
