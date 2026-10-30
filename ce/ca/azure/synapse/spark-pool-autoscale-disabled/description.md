# Description

Enable autoscale for Azure Synapse Analytics Apache Spark pools unless a pool has
an approved fixed-capacity requirement. Autoscale adjusts the number of nodes
between configured minimum and maximum limits as workload demand changes.

## Rationale

Spark workloads can vary substantially in demand. Autoscale helps match pool
capacity to that demand, reducing unnecessary compute consumption while retaining
capacity for active workloads.

## Impact

When autoscale is disabled, a Spark pool remains at a fixed node count and can
continue to incur charges during periods when fewer nodes would suffice. Enabling
autoscale can affect job startup time and throughput, so assess workload demand,
capacity limits, quotas, and approved performance requirements before changing a
pool.

## Audit

This policy evaluates an *Azure Synapse Spark pool* based on its autoscale
configuration.

The *Spark pool* is marked as `INCOMPLIANT` if `Auto Scale: State` is **Disabled**.

The *Spark pool* is marked as `INAPPLICABLE` if `Provisioning State` is not
**Succeeded**.

The *Spark pool* is marked as `UNDETERMINED` if `Provisioning State` or `Auto
Scale: State` is empty, `Auto Scale: State` is neither **Enabled** nor **Disabled**,
or, when autoscale is enabled, either node-count bound is empty or `Auto Scale: Min
Node Count` is greater than `Auto Scale: Max Node Count`.
