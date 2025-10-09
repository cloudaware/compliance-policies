# Description

This policy identifies AWS ElastiCache for Redis clusters where the Auto Minor Version Upgrade feature is not enabled.

When enabled, this setting ensures that clusters automatically apply minor engine upgrades, which may include new features, performance enhancements, bug fixes, and security patches released by AWS.

## Rationale

Enabling auto minor version upgrades reduces manual operational effort and helps ensure that ElastiCache clusters remain secure, stable, and performant. It also minimizes the risk of exposure to known vulnerabilities and software defects.

## Impact

If auto minor version upgrades are not enabled, clusters may continue running outdated software versions. This increases the risk of security vulnerabilities, performance degradation, and compatibility issues.

Enabling this feature may require a scheduled maintenance window. During the upgrade, the cluster can experience a brief service interruption. For multi-node clusters, ElastiCache performs rolling upgrades to minimize downtime.

## Audit

This policy flags an *AWS ElastiCache Cluster* for Redis as `INCOMPLIANT` if `Auto Minor Version Upgrade` is set to **false**.

*ElastiCache Clusters* for Memcached are marked as `INAPPLICABLE`.
