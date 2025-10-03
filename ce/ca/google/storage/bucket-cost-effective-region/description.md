# Description

This policy identifies Google Storage Buckets that are provisioned in Google regions known to have higher pricing compared to nearby alternatives.

## Rationale

Cloud service costs vary across regions due to differences in infrastructure expenses, energy pricing, and regional market conditions. For workloads without strict geographic or latency requirements, deploying instances in more cost-efficient regions within the same continent can deliver significant cost savings without adversely affecting performance.

## Impact

Migrating workloads to different regions requires careful planning to avoid service disruptions and to ensure latency, compliance, and data sovereignty requirements continue to be met.

## Audit

This policy flagged an *Google Storage Bucket* as `INCOMPLIANT` if it is **running** in one of the following regions identified as less cost-efficient:

| Region                                                  | Recommended Alternative               |
| ------------------------------------------------------- | ------------------------------------- |
| `us-west2`,<br>`us-west3`,<br>`us-west4`                | `us-west1`                            |
| `northamerica-northeast1`,<br>`northamerica-northeast2` | `us-east1`, `us-east5`, `us-central1` |
| `europe-north2`,<br>`europe-west9`,<br>`europe-west8`,<br>`europe-west6`,<br>`europe-west3`,<br>`europe-west2`,<br>`europe-west12`,<br>`europe-southwest1`|`europe-north1`, `europe-west1`, `europe-west4`|
