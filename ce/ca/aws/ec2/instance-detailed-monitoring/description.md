# Description

Enable detailed monitoring for Amazon EC2 instances to enhance the granularity of monitoring data collected by AWS CloudWatch. By default, CloudWatch provides basic monitoring, collecting metrics at 5-minute intervals. Detailed monitoring upgrades this to 1-minute intervals, offering higher resolution data for performance and operational insights. This configuration is crucial for maintaining robust compute resource management and optimizing your AWS infrastructure.

## Rational

Enabling detailed monitoring provides precise, high-frequency performance data that can be aggregated across similar EC2 instances for analysis. This level of insight is essential for troubleshooting, load balancing, and making informed decisions about scaling and capacity planning. Without detailed monitoring, resource metrics may lack the granularity needed to identify issues in time-sensitive or high-traffic environments, leading to potential inefficiencies or service disruptions.

## Impact

Remediating this issue involves enabling detailed monitoring, which can result in additional costs for CloudWatch metrics.

## Audit

This policy will mark a `running` EC2 instance as `INCOMPLIANT` if the `Monitoring State` field is set to `disabled`.

Instances that are not in the running state will be marked as `INAPPLICABLE`.
