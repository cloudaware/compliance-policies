# Description

This review-only policy identifies successfully provisioned Azure Cache for Redis
instances that have recorded zero cache hits and zero cache misses over 30 days.

## Rationale

A cache with no lookup activity may be idle while continuing to incur cost. The
metrics are not conclusive usage evidence because Redis can also support pub/sub,
locks, queues, sessions, and other patterns that do not produce cache hits or
misses.

## Impact

Removing or resizing a cache without checking those other patterns can interrupt
applications. Treat every result as an investigation, not as an automatic deletion
recommendation.

## Audit

This policy evaluates an *Azure Cache for Redis* instance based on its 30-day
cache lookup metrics.

The *Azure Cache for Redis* instance is marked as `INCOMPLIANT` if:

- `Monitor: Cache Hits, 30-Day` = **0**.
- `Monitor: Cache Misses, 30-Day` = **0**.

The instance is marked as `INAPPLICABLE` if its `Provisioning State` is not
**Succeeded**.

The instance is marked as `UNDETERMINED` if its provisioning state or either
30-day metric is unavailable.

The instance is marked as `COMPLIANT` if either 30-day metric is greater than
**0**.

An `INCOMPLIANT` result is a review candidate, not proof that the instance is
unused, because these metrics do not capture every Redis usage pattern.

This independently evaluates Cloudaware CMDB metrics. It has no direct equivalent
in the documented Azure Advisor or Defender catalogs; Redis reservation and
high-load recommendations evaluate different conditions.
