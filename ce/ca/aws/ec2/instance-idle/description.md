# Description

Identify Amazon EC2 instances with minimal activity over the past 14 days and address them to reduce unnecessary costs. Instances are classified as idle if they meet all the following criteria:

- Average CPU utilization below 5%
- Maximum CPU utilization below 15%
- Average network I/O less than 100 MB

## Rational

Idle EC2 instances consume resources and incur costs without contributing meaningfully to operations. Adding maximum CPU utilization as a criterion ensures instances experiencing brief spikes in usage are not prematurely identified as idle. This approach improves accuracy in cost-saving measures while maintaining operational efficiency. Addressing idle instances reduces waste and optimizes the AWS environment.

## Audit

This policy evaluates an EC2 instance based on its 14-day performance metrics.

The instance is marked as `INCOMPLIANT` if all the following criteria are met:

- `CPU Utilization, Average, %` field is less than 5%.
- `CPU Utilization, Max, %` field is less than 15%.
- `Network In, Sum, Megabytes` field is less than 100 MB.
- `Network Out, Sum, Megabytes` field is less than 100 MB.

The instance is marked as `INAPPLICABLE` if it is not currently running or it has been running for less than 14 days.

The instance is marked as `UNDETERMINED` if any of the evaluated metrics are empty, indicating insufficient data in the CMDB to assess whether the instance is idle.
