# Description

This policy identifies standalone AWS RDS Instances that are not configured to export database logs to Amazon CloudWatch Logs. It applies to supported database engines, including MariaDB, MySQL, PostgreSQL, Oracle, and SQL Server. Enabling log exports ensures that relevant database activity and operational events are captured and centrally stored for monitoring and analysis.

## Rationale

Exporting database logs to Amazon CloudWatch Logs is essential for maintaining operational visibility and supporting security and compliance requirements. Logs stored locally on an RDS instance are transient and may be lost during maintenance activities, instance restarts, or unexpected failures. CloudWatch Logs provides durable, centralized log storage that preserves historical data for analysis and auditing.

Once logs are available in CloudWatch, organizations can create metric filters and alarms to detect notable events such as repeated connection failures, unauthorized access attempts, or performance issues like slow queries. Additionally, CloudWatch Logs Insights enables efficient searching and analysis of log data across multiple RDS instances, improving troubleshooting and incident response.

Database audit logs are particularly important for tracking changes to data access and database schemas, helping organizations meet regulatory and compliance obligations.

## Impact

Enabling log exports to CloudWatch Logs may result in additional AWS costs. Charges can be incurred for log ingestion, log storage, and log retention based on the volume of database logs generated and the configured retention period.

Select only necessary log types, and configure appropriate retention policies to balance operational visibility with cost management.

## Audit

This policy flags an *AWS RDS Instance* as `INCOMPLIANT` if the `Enabled CloudWatch Logs Exports` field is **empty**.

*Instances* that are **not in an available state** or that **belong to an RDS cluster** are marked as `INAPPLICABLE`.
