# Description

This policy identifies AWS CloudTrail trails that are not configured to deliver trail events to Amazon CloudWatch Logs.

## Rationale

Integrating CloudTrail with Amazon CloudWatch Logs provides centralized, near-real-time visibility into AWS API activity. Once trail events are available in CloudWatch Logs, security and operations teams can create metric filters, alarms, dashboards, and queries to detect suspicious behavior, investigate changes, and accelerate incident response.

CloudWatch Logs integration complements S3 log delivery by making audit events easier to monitor as they occur and correlate with other service logs.

## Impact

Enabling CloudWatch Logs integration may increase AWS costs for log ingestion, storage, and retention. Review log retention settings and expected event volume to balance visibility with cost.

## Audit

This policy flags an *AWS CloudTrail Trail* as `INCOMPLIANT` when either the `CloudWatch Logs Log Group ARN` or `CloudWatch Logs Role ARN` field is **empty**.

Trails are also flagged as `INCOMPLIANT` when CloudWatch Logs integration is configured but the associated Log Group or IAM Role is missing from the CMDB.
