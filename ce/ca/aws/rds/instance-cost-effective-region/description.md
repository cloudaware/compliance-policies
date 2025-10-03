# Description

This policy identifies AWS RDS Instances that are provisioned in AWS regions known to have higher pricing compared to nearby alternatives.

## Rationale

Although pricing varies by instance type, certain AWS regions generally incur higher costs for compute resources. Running workloads in these regions can significantly increase operational expenses without delivering additional benefits, unless the region is specifically required for latency, compliance, or data residency. Identifying these instances allows you to assess whether migrating them to a lower-cost region is feasible, potentially resulting in substantial savings.

## Impact

Migrating workloads to different regions requires careful planning to avoid service disruptions and to ensure latency, compliance, and data sovereignty requirements continue to be met.

## Audit

This policy flagged an *AWS RDS Instance* as `INCOMPLIANT` if it is **available** in one of the following regions identified as less cost-efficient:

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

If the *RDS Instance* is not **available**, it is marked as `INAPPLICABLE`.
