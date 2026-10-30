# Remediation

Zero cache hits and misses do not prove that the instance is unused. Redis can
support workloads that do not perform cache lookups, so do not delete or resize
the instance based on this finding alone.

## Validate the Finding

1. Identify the instance owner and the applications that connect to it.
2. In Azure Monitor, select a representative period of at least 30 days and review
   `Cache Hits`, `Cache Misses`, `Total Commands Processed`, `Connected Clients`,
   `Cache Read`, and `Cache Write`.
3. Check application configuration and operational records for pub/sub, streams,
   distributed locks, queues, sessions, scheduled workloads, and other Redis uses
   that may not produce cache hits or misses.
4. Confirm whether the observed period includes normal business cycles and any
   expected seasonal or batch activity.

## Remediate

- If the instance supports a required non-cache workload, retain it and document
  its owner and purpose.
- If the instance is required but oversized, evaluate a smaller supported tier or
  capacity. Test workload limits, availability, performance, and rollback before
  applying the change.
- If the instance is confirmed unused, verify data-persistence, recovery, network,
  identity, secret, and infrastructure-as-code dependencies. Preserve any required
  data, then remove the instance through the approved change process and monitor
  dependent applications for errors.
