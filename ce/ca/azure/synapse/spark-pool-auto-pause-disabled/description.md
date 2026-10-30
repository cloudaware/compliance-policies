# Description

Ensure that auto-pause is enabled for Azure Synapse Spark pools. Auto-pause pauses a
pool after its configured period of inactivity, reducing the cost of idle compute.

## Rationale

Spark pools can continue consuming compute resources when no Spark jobs are running.
Enabling auto-pause reduces unnecessary spend while preserving the pool configuration
for future workloads.

## Impact

Without auto-pause, idle Spark pools can incur avoidable compute charges. Enabling it
can add resume latency to scheduled and interactive workloads, so the delay must suit
the workload's startup tolerance.

## Audit

This policy evaluates an *Azure Synapse Spark pool* only when its `Provisioning State`
is `Succeeded`.

A pool is marked as `INCOMPLIANT` when `Auto Pause: State` is `Disabled`.

A pool is marked as `INAPPLICABLE` when its `Provisioning State` is not `Succeeded`.

A pool is marked as `UNDETERMINED` when the provisioning state is unavailable, the
auto-pause state is missing or unrecognized, or an enabled pool has no configured delay.
