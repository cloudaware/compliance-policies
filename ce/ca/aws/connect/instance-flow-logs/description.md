# Description

This policy identifies AWS Connect Instances the are not configured to generate **contact flow logs** and deliver them to a designated **Amazon CloudWatch Logs** log group.

## Rationale

Contact flow logs capture detailed execution data as customer interactions traverse defined contact flows. When streamed to CloudWatch Logs, this information enables:

- Operational troubleshooting by identifying failed, stalled, or dropped interactions.
- Performance monitoring through analysis of queue wait times, latency, and contact flow execution behavior.
- Security and compliance auditing by maintaining a centralized and immutable audit trail of customer interactions and agent actions.

## Impact

If contact flow logging is not enabled, visibility into customer interaction behavior is significantly reduced, making issue diagnosis and experience optimization more difficult.

Enabling contact flow logs may result in additional costs associated with CloudWatch Logs data ingestion, storage, and retrieval.

## Audit

This policy flags an *AWS Connect Instance* as `INCOMPLIANT` if the the instance's `CONTACTFLOW_LOGS Attribute` is set to **false**.
