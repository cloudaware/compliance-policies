# Description

Ensure that access logging is enabled for Application, Network, and Classic Load Balancers. Access logs capture detailed information about requests processed by the load balancer.

## Rationale

When access logging is enabled, load balancer logs are delivered to a designated Amazon S3 bucket. These logs record information about each request, including client IP address, request path, response codes, and latency. Access logs are valuable for analyzing traffic patterns, supporting security investigations, implementing protection and compliance controls, and troubleshooting operational issues.

## Impact

Enabling access logging may result in additional Amazon S3 storage costs for retaining log files. There is no additional charge for the access logging feature itself.

## Audit

This policy flags an *AWS ELB load balancer* as **INCOMPLIANT** if the `Access Logs Enabled` field is **false**.

*Gateway Load Balancers* are marked as **INAPPLICABLE**.
