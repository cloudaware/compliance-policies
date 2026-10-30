# Description

This policy identifies AWS Classic Load Balancers that have **Connection Draining** disabled. Connection Draining allows a load balancer to stop routing new requests to instances that are being deregistered or marked unhealthy, while allowing existing in-flight requests to complete within a configured timeout period.

## Rationale

Enabling Connection Draining is critical during instance termination events caused by scale-in activities, maintenance operations, or when the load balancer detects an unhealthy instance and reroutes traffic.

Without Connection Draining, active connections may be terminated abruptly, which can lead to 5xx errors and negatively impact the end-user experience.

## Audit

This policy flags an *AWS Classic Load Balancer* as `INCOMPLIANT` when the `Connection Draining Enabled` is set to **false**.

Other *Load Balancer* types are marked as `INAPPLICABLE`.
