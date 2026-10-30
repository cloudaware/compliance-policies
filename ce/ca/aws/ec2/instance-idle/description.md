# Description

Identify Amazon EC2 instances with minimal activity over the past 14 days and address them to reduce unnecessary costs. When a linked New Relic host is available, this policy combines CloudWatch `CloudWatch: CPU, 14-Day` and `CloudWatch: CPU Max, 14-Day` with New Relic memory, disk read utilization, and disk write utilization plus 14-day network metrics. Otherwise, it uses the existing CloudWatch CPU and network metrics. Instances are classified as idle if they meet the applicable criteria:

- CPU utilization below 5%
- Maximum CPU utilization below 15%
- Memory utilization below 20%
- Disk read utilization below 5%
- Disk write utilization below 5%
- 14-day network I/O below 100 MB

## Rationale

Idle EC2 instances consume resources and incur costs without contributing meaningfully to operations. Adding maximum CPU utilization as a criterion ensures instances experiencing brief spikes in usage are not prematurely identified as idle. This approach improves accuracy in cost-saving measures while maintaining operational efficiency. Addressing idle instances reduces waste and optimizes the AWS environment.

## Audit

This policy evaluates an *AWS EC2 instance* over the last 14 days using CPU, network, and memory metrics.

Memory is evaluated in this order:

- If `New Relic Host` is present, use New Relic memory and disk utilization metrics.
- Otherwise, use `CloudWatch (Agent): Memory Used, 14-Day`.
- If that metric is empty, use `Nagios: Memory Utilization`.
- If all memory metrics are empty, fall back to CPU and network only.

The instance is marked as `INCOMPLIANT` when all of these baseline conditions are true:

- `CloudWatch: CPU, 14-Day` is less than 5%.
- `CloudWatch: CPU Max, 14-Day` is less than 15%.
- `CloudWatch: Network In, MB, 14-Day` is less than 100 MB.
- `CloudWatch: Network Out, MB, 14-Day` is less than 100 MB.

And one of these metric paths applies if present:

- `New Relic Host` is present, `New Relic Host: Memory Used, 14-Day` is less than 20%, `New Relic Host: Disk Read Utilization` is less than 5%, and `New Relic Host: Disk Write Utilization` is less than 5%.
- `CloudWatch (Agent): Memory Used, 14-Day` is less than 20%.
- `Nagios: Memory Utilization` is less than 20%.

The instance is marked as `INAPPLICABLE` if it is not currently running or has been running for less than 14 days.

The instance is marked as `UNDETERMINED` if any required CPU or network metric is empty, or if `New Relic Host` is present but a required New Relic memory or disk metric is empty.
