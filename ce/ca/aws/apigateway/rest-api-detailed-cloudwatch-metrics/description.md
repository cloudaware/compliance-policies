# Description

This policy identifies REST API Gateways where none of the related Stages have **Detailed CloudWatch Metrics** enabled. Detailed metrics allow monitoring of API stage caching, latency, and error rates at a more granular level, facilitating the configuration of precise alarms.

## Rationale

By default, API Gateway reports metrics at the stage level. Enabling **Detailed CloudWatch Metrics** provides additional metrics at the method level (e.g., `GET /resource`), including `Latency`, `IntegrationLatency`, `4XXError`, and `5XXError`. These granular metrics are critical for:

- Identifying specific performance bottlenecks
- Debugging issues at the individual method level
- Ensuring the reliability and operational health of API endpoints

## Audit

This policy targets the **REST APIs**.
An *API Gateway API* is flagged as `INCOMPLIANT` when at least one associated *API Gateway Stage* has the `CloudWatch Detailed Metrics Enabled` set to **False** or there is no *API Gateway Stage* associated with it.
