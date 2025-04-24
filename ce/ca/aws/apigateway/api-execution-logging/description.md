# Description

AWS API Gateway should have API Execution Logging enabled in CloudWatch to support effective monitoring and troubleshooting. Enabling execution logging in CloudWatch provides insight into API requests, error rates, and latency, helping detect and respond to issues promptly.

## Rationale

Enabling API execution logging in CloudWatch helps monitor API usage and performance, as well as identify and troubleshoot issues in real-time. It enhances visibility into API traffic patterns, execution errors, and latencies, facilitating better management of APIs.

## Impact

Enabling CloudWatch logging may increase CloudWatch costs due to additional logging data.

## Audit

This policy will mark an *AWS API Gateway API* as `INCOMPLIANT` if the `CloudWatch Logging Level` field in a related *API Stage* object is either **empty** or set to **OFF**.

For *API Gateway HTTP APIs* (identified by the `Protocol Type` field set to **HTTP**), the policy object will be marked as `INAPPLICABLE` because HTTP APIs do not support execution logging.
