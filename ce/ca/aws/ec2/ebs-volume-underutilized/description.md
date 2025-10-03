# Description

This policy identifies AWS EBS volumes of type `gp3`, `io1`, and `io2` that are underutilized based on their I/O operations over a 30-day period. A volume is considered underutilized if it is provisioned for high performance but exhibits low actual usage, indicating an opportunity for cost optimization.

**Criteria and Thresholds:**

- **`gp3` volumes:**

  - Volumes provisioned with IOPS above the free baseline of **3,000**.
  - Maximum theoretical operations per month for a 3,000 IOPS volume is **7,776,000,000** operations (calculated as 3,000 IOPS × 86,400 seconds/day × 30 days).
  - The threshold of **1,944,000,000 operations** corresponds to one-quarter of the maximum, serving as a marker for low utilization.
  - Volumes below this threshold are considered good candidates to be downsized to the 3,000 IOPS baseline.

- **`io1` and `io2` volumes:**

  - Minimum provisioned IOPS for these volumes is **100 IOPS**.
  - Maximum theoretical operations per month for a 100 IOPS volume is **259,200,000** operations (100 IOPS × 86,400 seconds/day × 30 days).
  - The threshold of **64,800,000 operations** represents one-quarter of this maximum, indicating underutilization.
  - Volumes below this threshold are good candidates to be downsized to better match workload requirements.

## Rationale

High-performance EBS volumes (`io1`, `io2`) or `gp3` volumes provisioned above the baseline IOPS result in unnecessary expenditure when being underutilized. By identifying such volumes, organizations can analyze workload patterns and rightsize them by adjusting size, type, or provisioned IOPS to better align with actual performance requirements.

## Impact

Before modifying any volume, it is essential to review historical performance data to avoid potential performance degradation during traffic spikes or peak workloads.

## Audit

An **AWS EBS Volume** is flagged as `INCOMPLIANT` if it meets either of the following conditions:

1. The volume `Type` is **gp3**, provisioned `IOPS` exceed **3,000**, and `CloudWatch: Write OPS Sum, 30-Day` and `CloudWatch: Read OPS Sum, 30-Day` metrics are both less than **1,944,000,000 operations**.
2. The volume type is **io1** or **io2**, and the `CloudWatch: IOPS Sum, 30-Day` metric is less than **64,800,000 operations**.

A volume is considered `INAPPLICABLE` if any of the following conditions are met:

- The volume is not attached to an *EC2 instance*.
- The volume was created or attached less than 30 days ago.
- The `CloudWatch: Write OPS Sum, 30-Day` and `CloudWatch: Read OPS Sum, 30-Day` metrics are **zero** or **null**, and the volume is evaluated by the **AWS EBS Volume is Idle** [policy](../ebs-volume-idle/).
- The volume `Type` is not **gp3**, **io1**, or **io2**.
