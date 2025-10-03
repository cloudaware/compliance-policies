# Description

This policy identifies AWS S3 Buckets that are storing objects in regions with higher pricing compared to nearby alternatives.

## Rationale

Storage costs vary across AWS regions. Buckets located in higher-cost regions may significantly increase expenses without providing additional benefits, unless required for specific use cases such as latency optimization, compliance, or data residency. Identifying these buckets enables organizations to evaluate whether migrating them to a more cost-effective region is feasible, potentially resulting in substantial savings.

## Impact

Migrating S3 buckets to different regions requires careful planning to ensure that performance, compliance, and data sovereignty requirements are maintained.

## Audit

This policy flagged an *AWS S3 Bucket* as `INCOMPLIANT` if it resides in one of the following regions identified as less cost-efficient:

| Region       | Recommended Alternative              |
| ------------ | ------------------------------------ |
| us-west-1    | us-west-2                            |
| ca-west-1    | us-west-2                            |
| ca-central-1 | us-east-2                            |
| eu-central-1 | eu-west-1, eu-north-1, or eu-south-2 |
| eu-west-2    | eu-west-1, eu-north-1, or eu-south-2 |
| eu-south-1   | eu-west-1, eu-north-1, or eu-south-2 |
| eu-west-3    | eu-west-1, eu-north-1, or eu-south-2 |
| eu-central-2 | eu-west-1, eu-north-1, or eu-south-2 |
