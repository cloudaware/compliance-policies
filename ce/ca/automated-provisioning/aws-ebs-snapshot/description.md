# Description

Identify AWS EBS Snapshots that appear to be associated with AWS-managed automated provisioning or protection workflows.

This policy checks for AWS-managed tag signals that can identify an EBS snapshot as associated with AWS Backup, Amazon Data Lifecycle Manager, AWS Application Migration Service, or AWS Elastic Disaster Recovery.

## Rationale

AWS-managed service tags can provide evidence that a snapshot was created or managed by an automated AWS workflow. This allows to distinguish snapshots with supported AWS-managed provisioning indicators from snapshots that are not identified by this tag-based method.

## Audit

This policy classifies an *AWS EBS Snapshot* as identified by automated provisioning evidence when the snapshot has one of the following supported tag signals:

* `aws:backup:source-resource`
* `AWSApplicationMigrationServiceManaged` with value `mgn.amazonaws.com`
* `AWSElasticDisasterRecoveryManaged` with value `drs.amazonaws.com`
* All of these Amazon Data Lifecycle Manager tags together:
  * `aws:dlm:lifecycle-policy-id`
  * `aws:dlm:lifecycle-schedule-name`
  * `dlm:managed`

The AWS Backup tag is included because AWS documents Amazon EBS backups as recovery points represented by EBS snapshots, and AWS-managed policy documentation references the `aws:backup:source-resource` tag as a tag used by AWS Backup when managing snapshots.

The Amazon Data Lifecycle Manager tags are included because AWS documents that Data Lifecycle Manager applies system tags to snapshots and AMIs created by a policy, including `aws:dlm:lifecycle-policy-id`, `aws:dlm:lifecycle-schedule-name`, and `dlm:managed`.

Other documented DLM system tags, such as `aws:dlm:expirationTime`, `aws:dlm:archived`, `aws:dlm:pre-script`, and `aws:dlm:post-script`, are not checked separately because AWS documents them as conditional tags for specific schedules or features. The policy uses the core DLM tag set that identifies the DLM policy and schedule.

The AWS Application Migration Service tag is included because AWS documents `AWSApplicationMigrationServiceManaged` as a service-created tag that cannot be changed or deleted. The policy requires the observed service value `mgn.amazonaws.com` so that the tag key alone is not treated as sufficient evidence.

The AWS Elastic Disaster Recovery tag is included because AWS documents `AWSElasticDisasterRecoveryManaged` in DRS-managed permissions for EC2 snapshots. The policy requires the observed service value `drs.amazonaws.com` so that the tag key alone is not treated as sufficient evidence.

EBS snapshots without one of the supported AWS-managed tag signals are classified as not identified by this automated provisioning tag signal. This result is not evidence by itself that the snapshot is misconfigured.

## References

1. [Amazon Data Lifecycle Manager tags](https://docs.aws.amazon.com/ebs/latest/userguide/dlm-elements.html#dlm-tags)
2. [AWS Application Migration Service service-created tags](https://docs.aws.amazon.com/mgn/latest/ug/configuration-editing.html)
3. [AWS Elastic Disaster Recovery full access policy](https://docs.aws.amazon.com/drs/latest/userguide/customer_managed_policies_drs_full_access.html)
