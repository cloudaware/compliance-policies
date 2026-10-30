# Description

This policy identifies AWS Lambda functions that do not have **active tracing with AWS X-Ray enabled**. When enabled, Lambda sends trace data to X-Ray for all incoming requests, allowing you to visualize the full lifecycle of a request as it flows through your function and integrated AWS services.

## Rationale

Enabling X-Ray tracing provides a detailed view of your serverless application’s execution, including latency within the Lambda function and calls to downstream services. This visibility helps identify the root cause of errors, timeouts, or performance bottlenecks by showing where failures occur in the request chain. Tracing also reveals service interactions and unintended dependencies, enabling more effective debugging and performance optimization.

## Audit

This policy flags an *AWS Lambda Function* as `INCOMPLIANT` if the `Tracing Config Response Mode` field is set to **PassThrough**.
