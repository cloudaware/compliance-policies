# Description

Ensure that Amazon EMR on EC2 clusters meet the release support requirements below. This policy evaluates the cluster's actual **Release Label**, independently of Hadoop, Spark, and other application versions. EMR on EKS and EMR Serverless resources are outside this policy's resource scope.

## Rationale

EMR releases in End of Support receive no fixes or technical support. Migrating workloads to supported releases reduces security and operational risk.

A release need not be the latest to remain supported. AWS may deliver security fixes in a newer patch, minor, or major release and does not backport Core Engine fixes to older patch or minor versions. Release support alone therefore does not establish that every available security update is installed. Customer code, Extras, custom AMI contents, and independently installed applications require separate assessment.

## Impact

An EMR release migration requires a replacement cluster and compatibility testing. Preserve required HDFS data, job outputs, logs, configuration, and credentials before terminating the original cluster.

## Audit

This policy marks an *AWS EMR Cluster* as `INCOMPLIANT` if its **Release Label** belongs to a release group below that has passed the applicable support deadline, and its **Status** is `STARTING`, `BOOTSTRAPPING`, `RUNNING`, `WAITING`, or `TERMINATING`.

| EMR release | Ordinary support through | Conditional migration extension through | `INCOMPLIANT` from |
| --- | --- | --- | --- |
| Published 4.x, 5.0-5.35, 6.0-6.5 | August 31, 2026 | None | September 1, 2026 |
| Published 5.36, 6.6-6.15 | August 31, 2026 | June 30, 2027 | September 1, 2026 |
| 7.0-7.2 | August 31, 2026 | August 31, 2027 | September 1, 2026 |
| 7.3 | October 16, 2026 | August 31, 2027 | October 17, 2026 |
| 7.4 | November 13, 2026 | August 31, 2027 | November 14, 2026 |
| 7.5 | November 21, 2026 | August 31, 2027 | November 22, 2026 |
| 7.6 | January 10, 2027 | August 31, 2027 | January 11, 2027 |
| 7.7 | February 6, 2027 | August 31, 2027 | February 7, 2027 |
| 7.8 | March 7, 2027 | August 31, 2027 | March 8, 2027 |
| 7.9 | May 19, 2027 | August 31, 2027 | May 20, 2027 |
| 7.10 | August 15, 2027 | August 31, 2027 | August 16, 2027 |
| 7.11 | November 3, 2027 | None | November 4, 2027 |
| 7.12 | November 21, 2027 | None | November 22, 2027 |
| 7.13 | April 20, 2028 | None | April 21, 2028 |
| 7.14 | September 8, 2028 | None | September 9, 2028 |
| emr-spark-8.0.0 | May 20, 2028 | None | May 21, 2028 |
| emr-spark-8.1.0 LTS | September 7, 2029 | None | September 8, 2029 |

For EMR **7.0-7.10**, the finding begins after the original support period ends. Conditional AWS support may continue through August 31, 2027, but the release remains `INCOMPLIANT` during that extension. From September 1, 2027, the finding indicates that the final conditional support window has also ended.

For releases **5.36** and **6.6-6.15**, the finding begins after bridge support ended on August 31, 2026. Conditional AWS support may continue through June 30, 2027, but the release remains `INCOMPLIANT` during that extension. From July 1, 2027, the finding indicates that the final conditional support window has also ended.

All other nonempty **Release Label** values are `COMPLIANT`, including future releases without a known elapsed support deadline in this policy.

Clusters are `INAPPLICABLE` if **Status** is `TERMINATED` or `TERMINATED_WITH_ERRORS`, or **Release Label** is missing, including legacy 2.x/3.x AMI-only records.

Missing or unrecognized **Status** produces `UNDETERMINED`. Disappeared records are marked `DISAPPEARED`.
