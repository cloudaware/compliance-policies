# Description

This policy identifies AWS OpenSearch Domains that do not adhere to high-availability best practices, specifically the requirement for a minimum of three data nodes and the use of Zone Awareness.

## Rationale

High availability in AWS OpenSearch Service is achieved through redundancy and fault isolation across Availability Zones:

1. **Zone Awareness**: When enabled, OpenSearch distributes nodes and their associated shards across two or three Availability Zones (AZs). This design ensures that the failure of a single AZ does not result in data loss or a complete service outage.
2. **Instance Count**: A minimum of three data nodes is recommended for production environments. This configuration supports quorum-based master elections and ensures that the cluster remains operational with adequate capacity if a node or an Availability Zone becomes unavailable.

## Impact

If Zone Awareness is disabled or the instance count is insufficient, the OpenSearch domain becomes a single point of failure. Hardware issues, node failures, or Availability Zone disruptions may cause the cluster to enter a **Red** state, resulting in partial or complete loss of data availability.

## Audit

This policy flags an *AWS OpenSearch Domain* as `INCOMPLIANT` when either of the following conditions is met:

- `Cluster Config: Zone Awareness Enabled` is set to **false**, or
- `Cluster Config: Instance Count` is less than **3**
