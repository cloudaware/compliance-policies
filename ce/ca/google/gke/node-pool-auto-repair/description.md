# Description

This policy verifies that the **Auto-Repair** feature is enabled for GKE Cluster Node Pools.

## Rationale

The node auto-repair feature ensures that cluster nodes remain in a healthy, operational state. When enabled, GKE continuously monitors the health of each node. If a node fails consecutive health checks over a defined period, GKE automatically initiates a repair process for that node, reducing downtime and improving workload reliability.

## Impact

If multiple nodes require repair simultaneously, GKE may perform repairs in parallel. The number of concurrent repairs is limited based on cluster size and the total number of failed nodes. Larger clusters allow for more concurrent repairs, while limits are reduced when many nodes are in a failed state.

Node auto-repair is not supported on **alpha clusters**.

## Audit

This policy marks a *Google GKE Cluster Node Pool* as `INCOMPLIANT` if `Node Management: Auto-Repair` is **not** set to **Enabled**.

## Default Value

Node auto-repair is enabled by default.

## References

1. <https://cloud.google.com/kubernetes-engine/docs/how-to/node-auto-repair>
