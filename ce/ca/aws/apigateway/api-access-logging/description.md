# Description

It is recommended for AWS API Gateway APIs to have access logging configured and enabled. Access logging records request and response data such as IP addresses, request methods, and user agents in Amazon CloudWatch Logs, creating a centralized location to analyze API usage and detect suspicious activity.

## Rationale

Enabling access logging for API Gateway in AWS is essential for monitoring API usage patterns, debugging issues, and meeting compliance requirements. Access logs provide a crucial data source for identifying unusual patterns, tracking specific actions, and establishing accountability by capturing the specifics of each API call.

## Impact

If API Gateway access logging is not enabled, it may lead to insufficient visibility into API interactions, hindering timely detection of security breaches or misconfigurations. It can also impair root cause analysis for performance or functional issues, creating obstacles in incident response and remediation.

Enabling access logging could introduce an increase in logging costs and require additional data management.

## Audit

This policy will mark an *API Gateway API* as `INCOMPLIANT` if the *API Gateway Stage* `Access Logging Destination ARN` field is **empty**, indicating access logs are not enabled.

It will also be marked `INCOMPLIANT` if the `Access Logging Destination` field is **empty** or if the log destination resource has been **deleted**, indicating that the *API Gateway Stage* might be referencing an inactive access logs destination.
