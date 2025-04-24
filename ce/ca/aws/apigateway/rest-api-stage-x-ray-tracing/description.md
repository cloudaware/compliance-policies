# Description

Enable X-Ray active tracing for API Gateway REST API stages to capture real-time metrics and trace the flow of user requests. This ensures enhanced monitoring and performance optimization across connected API Gateway and backend services.

## Rationale

Enabling X-Ray Active tracing provides detailed visibility into API request performance, allowing rapid identification and resolution of bottlenecks or anomalies in the underlying infrastructure. With real-time metrics, teams can respond proactively to issues, reducing downtime risks and improving system performance. This traceability is especially critical for applications with complex dependencies and distributed architectures.

## Impact

Enabling X-Ray Active tracing incurs costs associated with trace data processing and storage.

## Audit

This policy marks an *API Gateway Stage* as `INCOMPLIANT` if the `X-Ray Tracing Enabled` field is set to **No**.
