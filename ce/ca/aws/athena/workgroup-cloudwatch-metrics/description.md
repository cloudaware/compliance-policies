# Description

Ensure that CloudWatch Metrics are enabled for the AWS Athena Workgroup. This setting provides visibility into query performance and operational behavior, enabling effective monitoring, diagnostics, and optimization.

## Rationale

Enabling CloudWatch Metrics for Athena Workgroups allows for:

1. **Performance Monitoring**: Track indicators such as query execution time, data scanned, and bytes returned to identify inefficiencies and performance bottlenecks.
2. **Operational Insights**: Understand usage trends, monitor workgroup activity, and detect anomalies or abnormal query patterns.
3. **Proactive Troubleshooting**: Set up alarms and dashboards in CloudWatch based on Athena metrics to detect and respond to errors, timeouts, or degraded performance.

By enabling CloudWatch Metrics, administrators can proactively manage and optimize Athena workgroup performance, ensuring reliable and efficient query execution.

## Impact

Enabling CloudWatch Metrics may incur additional costs, depending on the volume and frequency of metrics published.

## Audit

This policy flags an *Athena Workgroup* as `INCOMPLIANT` when `Config: Publish Cloud Watch Metrics` field is set to **Disabled**.
