# Description

Identify Amazon EC2 instances that are underutilized, meaning they consistently have average CPU utilization below 40% and maximum CPU utilization does not spike above 50% over a 14-day period. Underutilized instances are often oversized for their workloads, leading to unnecessary costs. By right-sizing or consolidating workloads, organizations can improve cost efficiency and ensure effective use of compute resources.

## Rational

Underutilized EC2 instances consume resources inefficiently, leading to higher costs without proportional benefits. These instances may indicate improper sizing or unused capacity. Addressing this issue helps optimize AWS spending, improves performance allocation, and aligns resources with actual usage requirements. Right-sizing or terminating these instances also contributes to more sustainable cloud practices by reducing resource consumption.

## Impact

Resizing, consolidating, or shutting down underutilized instances reduces waste but requires careful planning to avoid performance degradation for active workloads.

## Audit

This policy evaluates an EC2 instance based on its 14-day performance metrics.

The instance is marked as `INCOMPLIANT` if all the following criteria are met:

- `CPU Utilization, Average, %` field is less than 40%.
- `CPU Utilization, Max, %` field is less than 50%.

The instance is marked as `INAPPLICABLE` if it is not currently running, it has been running for less than 14 days, or this instance is idle and evaluated by the **AWS EC2 Instance is idle** policy.

The instance is marked as `UNDETERMINED` if any of the evaluated metrics are empty, indicating insufficient data in the CMDB to assess whether the instance is underutilized.
