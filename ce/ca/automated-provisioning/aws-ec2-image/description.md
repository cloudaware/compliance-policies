# Description

Identify AWS EC2 AMIs that appear to be associated with AWS-managed backup, lifecycle, or provisioning workflows.

This policy checks for AWS-managed tag signals that can help identify an AMI as associated with AWS Backup, Amazon Data Lifecycle Manager, or AWS Service Catalog.

## Rationale

AWS-managed tags can provide evidence that an AMI was created or managed by an automated AWS workflow. This allows to distinguish AMIs with supported AWS-managed provisioning indicators from AMIs that are not identified by this tag-based method.

## Audit

This policy classifies an *AWS EC2 AMI* as identified by automated provisioning evidence when the AMI has one of the following supported tag signals:

* `aws:backup:source-resource`
* All of these Amazon Data Lifecycle Manager tags together:
  * `aws:dlm:lifecycle-policy-id`
  * `aws:dlm:lifecycle-schedule-name`
  * `dlm:managed`
* One of the AWS Service Catalog AutoTags:
  * `aws:servicecatalog:portfolioArn`
  * `aws:servicecatalog:productArn`
  * `aws:servicecatalog:provisioningPrincipalArn`
  * `aws:servicecatalog:provisionedProductArn`
  * `aws:servicecatalog:provisioningArtifactIdentifier`

The AWS Backup tag is included because AWS Backup documents Amazon EC2 as a supported resource and the AWS Backup service role policy grants EC2 AMI creation, copy, tagging, and image attribute permissions that are scoped to the `aws:backup:source-resource` resource tag. The tag is also AWS-reserved because it uses the `aws:` prefix.

The Amazon Data Lifecycle Manager tags are included because AWS documents that Data Lifecycle Manager applies system tags to snapshots and AMIs created by a policy, including `aws:dlm:lifecycle-policy-id`, `aws:dlm:lifecycle-schedule-name`, and `dlm:managed`. The policy requires the core DLM tag set together so a partial copied tag is not treated as sufficient evidence.

The Service Catalog tags are included because AWS documents these AutoTags as automatically applied tags that identify the origin of Service Catalog provisioned resources, and notes that AutoTags can be viewed in downstream services used for provisioning, including Amazon EC2.

EC2 AMIs without one of the supported AWS-managed tag signals are classified as not identified by this automated provisioning tag signal. This result is not evidence by itself that the AMI is misconfigured.

## References

1. [AWS Backup feature availability](https://docs.aws.amazon.com/aws-backup/latest/devguide/backup-feature-availability.html)
2. [AWSBackupServiceRolePolicyForBackup](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AWSBackupServiceRolePolicyForBackup.html)
3. [Amazon Data Lifecycle Manager tags](https://docs.aws.amazon.com/ebs/latest/userguide/dlm-elements.html#dlm-tags)
4. [AWS Service Catalog AutoTags](https://docs.aws.amazon.com/servicecatalog/latest/adminguide/autotags.html)
