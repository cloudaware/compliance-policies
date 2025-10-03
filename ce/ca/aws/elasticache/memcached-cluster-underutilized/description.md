# Description

This policy identifies AWS ElastiCache for Memcached Clusters that appear to be underutilized based on their average CPU utilization over the past 30 days.

## Rationale

Operating underutilized ElastiCache clusters results in unnecessary cloud costs. By identifying and rightsizing these clusters, you can reduce expenses while maintaining application performance.

## Impact

Before downsizing or decommissioning a cluster, verify that it is not supporting workloads with infrequent but high CPU demands. Premature rightsizing may introduce performance bottlenecks during peak usage periods.

## Audit

This policy flags an *AWS ElastiCache Cluster* for Memcached as `INCOMPLIANT` if its `CPU Utilization, Average, %` metric is below **40%** over the last 30 days.

*ElastiCache Clusters* for Redis are marked as `INAPPLICABLE`.

*Clusters* created within the last 30 days or not in an **available** `Status` are also marked as `INAPPLICABLE`.
