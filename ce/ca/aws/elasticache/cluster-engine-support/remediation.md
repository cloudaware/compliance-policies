# Remediation

## Upgrade to an Engine Version Within Standard Support

### From Console

1. **Confirm the current configuration.** Confirm the cluster's current engine, version, status, and replication group in the ElastiCache console in the correct AWS account and Region. Compare these with Cloudaware; refresh collection if they differ. For replication-group members, plan one change for the replication group rather than changing individual nodes independently.

2. **Choose a supported target version.** Choose a compatible version within AWS standard support using the [AWS engine upgrade guidance](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/VersionManagement.html). Confirm availability in the cluster's Region and compatibility with its node type and deployment configuration. Consider Valkey for Redis OSS migrations where supported; the newest release is not required. Redis OSS 6 leaves standard support on January 31, 2027, so consider the target's remaining support window.

3. **Test the upgrade and prepare recovery.** Test client libraries, authentication, parameter groups, scripts, commands, replication, and application behavior against the target engine. Check the supported upgrade path and any intermediate upgrades. Plan rollback and a recoverable backup where supported; do not assume an engine downgrade is available.

4. **Schedule and perform the upgrade.** In the ElastiCache console, select the replication group, or the standalone cluster if it has no group, choose **Modify**, and select the tested target engine/version and compatible parameter group. Schedule the upgrade for an approved maintenance window. For a global datastore, follow its coordinated upgrade workflow across Regions. Although this policy currently produces lifecycle findings only for Redis OSS, a future Memcached upgrade needs separate planning: AWS documents in-place version upgrades as destructive, with data loss and a cold cache.

5. **Verify the completed upgrade.** Verify health, connectivity, latency, and the actual engine version after the change. Refresh Cloudaware inventory and reassess this policy. A pending upgrade does not resolve the finding.

### Verify From Command Line

Use this read-only CLI check to verify the installed version, replacing the placeholders with the affected cluster ID and Region:

```sh
aws elasticache describe-cache-clusters \
    --cache-cluster-id CLUSTER_ID \
    --region REGION \
    --query 'CacheClusters[].{Engine:Engine,Version:EngineVersion,Status:CacheClusterStatus,ReplicationGroup:ReplicationGroupId,Pending:PendingModifiedValues}'
```

Consult [AWS version management](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/VersionManagement.html) for engine-specific upgrade behavior. Verify the actual version on every affected member after maintenance; selecting a target version alone does not resolve the finding.
