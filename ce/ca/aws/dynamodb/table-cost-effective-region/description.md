# Description

This policy identifies AWS DynamoDB Tables that are provisioned in regions with higher pricing compared to nearby alternatives.

## Rationale

DynamoDB pricing varies across AWS regions, particularly for read and write requests. Running workloads in higher-cost regions can significantly increase operational expenses without providing additional benefits, unless the region is specifically required for latency optimization, compliance, or data residency. Identifying these tables enables organizations to evaluate whether migrating them to more cost-efficient regions is feasible, potentially resulting in substantial savings.

## Impact

Migrating DynamoDB workloads to different regions requires careful planning to avoid service disruptions and to ensure latency, compliance, and data sovereignty requirements are maintained.

## Audit

This policy flagged an *AWS DynamoDB Table* as `INCOMPLIANT` if it is **ACTIVE** in one of the following regions identified as less cost-efficient:

| Region         | Recommended Alternative              |
| -------------- | ------------------------------------ |
| us-west-1      | us-west-2                            |
| ca-west-1      | us-west-2                            |
| ap-northeast-1 | ap-northeast-2                       |
| ap-northeast-3 | ap-northeast-2                       |
| ca-central-1   | us-east-2                            |
| eu-central-1   | eu-west-1, eu-north-1, or eu-south-2 |
| eu-west-2      | eu-west-1, eu-north-1, or eu-south-2 |
| eu-south-1     | eu-west-1, eu-north-1, or eu-south-2 |
| eu-west-3      | eu-west-1, eu-north-1, or eu-south-2 |
| eu-central-2   | eu-west-1, eu-north-1, or eu-south-2 |

If the *DynamoDB Table* is not **ACTIVE**, it is marked as `INAPPLICABLE`.
