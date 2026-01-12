# Description

This policy identifies AWS OpenSearch Domains that are configured with fewer than three dedicated master nodes or do not have dedicated master nodes enabled.

## Rationale

Dedicated master nodes are responsible for critical cluster management functions, including maintaining cluster state, monitoring node health, coordinating shard allocation, and processing configuration changes.

1. **Stability**: Separating cluster management responsibilities from data nodes reduces resource contention. Even under heavy indexing or query workloads, dedicated master nodes help maintain cluster stability.
2. **Quorum and High Availability**: OpenSearch uses a quorum-based election process to prevent split-brain scenarios, where multiple nodes incorrectly assume leadership. A minimum of three dedicated master nodes ensures that the cluster can still elect a master if one node becomes unavailable.
3. **Best Practices**: For production workloads, AWS recommends using an odd number of dedicated master nodes, typically three or five, to maximize fault tolerance and maintain quorum during failures.

## Audit

This policy flags an *AWS OpenSearch Domain* as `INCOMPLIANT` when either of the following conditions is met:

- `Cluster Config: Dedicated Master Enabled` is set to **false**, or
- `Cluster Config: Dedicated Master Count` is less than **3**
