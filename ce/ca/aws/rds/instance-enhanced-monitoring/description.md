# Description

This policy identifies AWS RDS Instances for which **Enhanced Monitoring** is not enabled.

Amazon RDS provides real-time OS metrics for the DB instances it runs. These metrics allow you to view system-level performance data and process information directly in the AWS Management Console. You can control which metrics are collected for each instance and customize monitoring dashboards based on your operational requirements.

## Rationale

Enhanced Monitoring offers deeper visibility into database instance health by collecting metrics from an agent running on the instance, rather than relying solely on hypervisor-level data. It delivers OS-level metrics, such as CPU utilization, memory usage, file system activity, and disk I/O, at granular intervals as low as one second.

In contrast, standard Amazon CloudWatch metrics are aggregated at 60-second intervals. Enhanced Monitoring enables detection of short-lived performance spikes or resource-intensive processes that may be obscured by one-minute averages.

## Audit

This policy flags an *Amazon RDS instance* as `INCOMPLIANT` if the `Monitoring Interval` is set to `0` (disabled).

*Instances* that are **not in an available state** or that **belong to an RDS cluster** are marked as `INAPPLICABLE`.
