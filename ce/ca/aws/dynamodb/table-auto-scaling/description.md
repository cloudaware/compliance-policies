# Description

This policy checks that Amazon DynamoDB tables configured with provisioned throughput mode have Auto Scaling enabled.

## Rationale

DynamoDB Auto Scaling automates the management of throughput capacity for tables. It dynamically adjusts provisioned read and write capacity in response to actual traffic patterns. This helps maintain application performance by preventing request throttling while reducing costs by automatically decreasing capacity for idle workloads.

## Impact

Without Auto Scaling, DynamoDB tables are at risk of being either over-provisioned, leading to unnecessary costs, or under-provisioned, resulting in throttled requests, increased latency, and potential service disruptions.

## Audit

This policy marks an *AWS DynamoDB Table* as `INCOMPLIANT` if it is in **Provisioned** mode but does *not* have a related *AWS App AutoScaling Scalable Target* record in the CMDB.

Table configured with **On-Demand** capacity mode is flagged as `INAPPLICABLE`.
