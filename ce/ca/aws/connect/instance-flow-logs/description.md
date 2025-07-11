# Description

Ensure that AWS Connect Instances are configured to generate contact flow logs and deliver them to a designated CloudWatch log group.

## Rationale

Enabling contact flow logs provides detailed records of customer interactions as they move through your defined contact flows. Streaming this data to CloudWatch Logs enables:

- Root‑cause analysis and troubleshooting of failed or dropped interactions,
- Performance monitoring to measure latency, queue wait times, and flow execution metrics
- Security auditing to maintain an immutable audit trail of customer interactions and agent actions.

## Impact

Without these logs, diagnosing issues and understanding customer experience becomes significantly more difficult.

Enabling and storing flow logs in CloudWatch Logs may incur additional charges for data ingestion, storage, and retrieval.

## Audit

This policy marks an *AWS Connect Instance* as `INCOMPLIANT` if the instance's `CONTACTFLOW_LOGS Attribute` is set to **false**.
