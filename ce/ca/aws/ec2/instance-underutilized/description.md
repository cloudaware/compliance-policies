# Description

Identify Amazon EC2 instances that are underutilized, meaning they consistently have average CPU and memory utilization below 40% and maximum CPU utilization does not spike above 50% over a 14-day period. Underutilized instances are often oversized for their workloads, leading to unnecessary costs. By right-sizing or consolidating workloads, organizations can improve cost efficiency and ensure effective use of compute resources.

## Rationale

Underutilized EC2 instances consume resources inefficiently, leading to higher costs without proportional benefits. These instances may indicate improper sizing or unused capacity. Addressing this issue helps optimize AWS spending, improves performance allocation, and aligns resources with actual usage requirements. Right-sizing or terminating these instances also contributes to more sustainable cloud practices by reducing resource consumption.

## Impact

Resizing, consolidating, or shutting down underutilized instances reduces waste but requires careful planning to avoid performance degradation for active workloads.

## Audit

This policy evaluates an *AWS EC2 Instance* over the last 14 days using CPU and memory metrics, while excluding instances already classified by the [**AWS EC2 Instance is idle**](../instance-idle) policy.

Memory is evaluated in this order:

- If `New Relic Host` is present, use `New Relic Host: Memory Used, 14-Day`.
- Otherwise, use `CloudWatch (Agent): Memory Used, 14-Day`.
- If that metric is empty, use `Nagios: Memory Utilization`.
- If all memory metrics are empty, fall back to CPU only.

The instance is marked as `INCOMPLIANT` when all of these baseline conditions are true:

- `CloudWatch: CPU, 14-Day` is less than 40%.
- `CloudWatch: CPU Max, 14-Day` is less than 50%.

And one of these metric paths applies if present:

- `New Relic Host` is present and `New Relic Host: Memory Used, 14-Day` is less than 40%.
- `CloudWatch (Agent): Memory Used, 14-Day` is less than 40%.
- `Nagios: Memory Utilization` is less than 40%.

The instance is marked as `INAPPLICABLE` if it is not currently running, has been running for less than 14 days, or is already considered by the [**AWS EC2 Instance is idle**](../instance-idle) policy.

The instance is marked as `UNDETERMINED` if either required CPU metric is empty, or if `New Relic Host` is present but `New Relic Host: Memory Used, 14-Day` is empty.
