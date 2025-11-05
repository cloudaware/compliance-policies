# Description

This policy checks that AWS EC2 Auto Scaling Groups that use a mixed instances launch template but do not have Capacity Rebalancing enabled.

Capacity Rebalancing helps you maintain application availability by proactively launching a new Spot Instance to replace one that is at an increased risk of interruption.

## Rationale

Spot Instances offer a cost-effective way to run workloads, however, they can be interrupted when EC2 reclaims capacity. Enabling Capacity Rebalancing helps minimize the impact of such interruptions. When a Spot Instance receives a rebalance recommendation, the Auto Scaling group proactively launches a replacement instance, allowing your application to maintain stability and performance before the original instance is terminated.

## Impact

If Capacity Rebalancing is not enabled, your application may experience reduced availability or performance degradation when Spot Instances are interrupted and replacements cannot be provisioned promptly.

## Audit

This policy flags an *AWS EC2 Auto Scaling Group* as `INCOMPLIANT` if it uses a mixed instances launch template and `Capacity Rebalancing` is not set to **Enable**.

The ASG is marked as `INAPPLICABLE` if the `Mixed Instances Launch Template ID` is empty.
