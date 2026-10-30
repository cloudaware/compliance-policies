# Description

This policy identifies AWS DMS Replication Instances that are not configured for Multi-AZ deployment.

## Rationale

A DMS replication instance is the compute layer that runs migration and replication tasks between source and target systems. When the instance is deployed in a single Availability Zone, a zonal disruption can interrupt replication, delay cutover activities, and extend recovery time for data migration workloads.

Enabling Multi-AZ deployment allows AWS to maintain a standby replication instance in a different Availability Zone and fail over during infrastructure events. This improves service resilience and reduces the risk of prolonged migration interruptions for business-critical workloads.

## Impact

Enabling Multi-AZ deployment increases cost because AWS provisions standby capacity in a second Availability Zone. Applying the change can also trigger a modification event for the replication instance, so it should be scheduled during an approved maintenance window or a period of low migration activity.

## Audit

This policy flags an *AWS DMS Replication Instance* as `INCOMPLIANT` if the `Multi AZ` checkbox is set to **false**.
