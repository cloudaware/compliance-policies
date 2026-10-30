# Description

Ensure that AWS ElastiCache node-based clusters use engine versions within AWS standard support. This policy assesses the current **Engine** and **Engine Version**, independently of automatic minor upgrades or a pending upgrade. It includes standalone clusters and replication-group members; ElastiCache Serverless caches are a separate resource type and are outside its scope.

## Rationale

Remaining within standard support avoids paid Extended Support and reduces reliance on limited maintenance coverage and eventual forced upgrades. Owners can resolve findings by testing and scheduling a supported engine upgrade. Community EOL does not establish the end of AWS service support, and a version does not fail this policy merely because a newer version exists.

## Impact

Upgrades can affect compatibility, connections, and availability. Test applications and plan a maintenance window. Extended Support findings indicate an upgrade requirement under this policy, not an assertion that AWS provides no support.

## Audit

This policy marks an *AWS ElastiCache Cluster* as `INCOMPLIANT` if its **Engine** is **redis** and the major component of its **Engine Version** is 2, 3, 4, or 5, or is 6 after January 31, 2027. Redis OSS 2/3 are already past AWS EOL, and 4/5 are already outside standard support. These past events are unconditional findings. Only future lifecycle transitions use date comparisons.

| Redis OSS version | Last standard support date | Extended Support window | AWS EOL |
| --- | --- | --- | --- |
| 4 and 5 | January 31, 2026 | February 1, 2026 through January 31, 2029 | January 31, 2029 |
| 6 | January 31, 2027 | February 1, 2027 through January 31, 2030 | January 31, 2030 |

AWS requires the latest supported patch for Extended Support and automatically enrolls remaining Redis OSS 4/5 caches after upgrading them to 4.0.10/5.0.6 where necessary.

Other versions are `COMPLIANT` when no known lifecycle condition matches. There is no allowlist of compliant versions: newer Redis OSS releases and patches also pass. Valkey and Memcached pass independently of the Redis OSS calendar because AWS currently publishes no corresponding lifecycle deadlines for them. Upstream community EOL dates are not applied to these AWS-managed engines.

Clusters with a **Status** of **creating**, **deleting**, **deleted**, or **restore-failed** are `INAPPLICABLE`. Missing or unrecognized statuses are `UNDETERMINED`; other documented statuses remain assessable. Disappeared records are handled automatically by the engine.
