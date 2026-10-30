# Description

This policy identifies supported AWS RDS clusters that are not configured to export the required engine-specific database logs to Amazon CloudWatch Logs. It applies to Aurora MySQL, Aurora PostgreSQL, Amazon DocumentDB, and Amazon Neptune clusters.

The required log export depends on the database engine:

- **Aurora MySQL**: `audit`
- **Aurora PostgreSQL**: `postgresql`
- **Amazon DocumentDB**: `audit`
- **Amazon Neptune**: `audit`

## Rationale

Exporting database logs to Amazon CloudWatch Logs is critical for maintaining operational visibility and meeting security and compliance requirements. Logs stored locally on an RDS cluster are transient and may be lost during maintenance operations, cluster restarts, or unexpected failures. By contrast, CloudWatch Logs provides durable, centralized storage that preserves historical log data for auditing and forensic analysis.

Once logs are available in CloudWatch Logs, organizations can create metric filters and alarms to detect significant events, such as repeated connection failures, unauthorized access attempts, or performance issues including slow-running queries. CloudWatch Logs Insights further enhances visibility by enabling efficient querying and analysis of log data across multiple RDS clusters, improving troubleshooting and incident response capabilities.

Audit logs are particularly important because they provide a record of security-relevant database activity that supports investigations, governance, and compliance reporting.

## Impact

Enabling log exports to CloudWatch Logs may result in additional AWS costs. Charges may apply for log ingestion, storage, and retention, depending on the volume of logs generated and the configured retention period.

To manage costs effectively, enable only the required log types and define appropriate log retention policies that balance operational visibility with cost considerations.

## Audit

This policy flags a supported *AWS RDS Cluster* as `INCOMPLIANT` when the `Enabled CloudWatch Logs Exports` field does not include the required log type for its engine.

*Clusters* that are **not in an available state** or that use an **unsupported engine** are marked as `INAPPLICABLE`.
