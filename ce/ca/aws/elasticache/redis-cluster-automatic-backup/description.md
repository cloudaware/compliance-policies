# Description

This policy identifies AWS ElastiCache Clusters for Redis OSS and Valkey that do not have automatic backups enabled. Automatic backups are considered enabled when the snapshot retention period is set to a value greater than zero.

## Rationale

Enabling automatic backups allows ElastiCache to create daily snapshots of your Redis or Valkey cluster and retain them for a defined period. These snapshots can be used to restore the cluster to a known good state in the event of data corruption, accidental deletion, or cluster failure, significantly reducing data loss and downtime.

## Impact

Enabling automatic backups may slightly increase storage costs and can introduce brief latency during snapshot creation.

## Audit

This policy flags an *AWS ElastiCache Cluster* for Redis as `INCOMPLIANT` if `Snapshot Retention Limit` is set to **0**.

*ElastiCache Clusters* for Memcached are marked as `INAPPLICABLE`.
