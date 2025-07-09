# Description

This policy checks if standard logging is enabled for AWS CloudFront Distributions.

Standard logging supports:

- Delivery of access logs to Amazon CloudWatch Logs, Amazon Kinesis Data Firehose, and Amazon S3.
- Selection of specific log fields, including a subset of real‑time log fields.
- Configuration of additional output log file formats.

## Rationale

Standard logs provide details for each distribution request (e.g., the viewer’s IP address, requested path and object, HTTP status code and method, timestamp, and user agent) enabling monitoring, troubleshooting, and security auditing.

## Impact

Enabling standard logging may increase charges for log storage and data transfer.

## Audit

This policy flags an *AWS CloudFront Web Distribution* as `INCOMPLIANT` if the `Logging Enabled` checkbox is **false**.
