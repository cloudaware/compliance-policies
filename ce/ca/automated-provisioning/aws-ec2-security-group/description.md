# Description

Identify AWS EC2 Security Groups that appear to be associated with AWS-managed provisioning or management workflows.

This policy checks for AWS-managed tag signals that can help identify an EC2 security group as associated with AWS CloudFormation, Amazon EKS, AWS Service Catalog, AWS Application Migration Service, AWS Elastic Disaster Recovery, or AWS Elastic Beanstalk.

## Rationale

AWS-managed tags can provide evidence that an EC2 security group was created by, attached to, or managed through an AWS service workflow. This allows to distinguish security groups with supported AWS-managed provisioning indicators from security groups that are not identified by this tag-based method.

## Audit

This policy classifies an *AWS EC2 Security Group* as identified by automated provisioning evidence when the security group has one of the following supported tag signals:

* One of the AWS CloudFormation stack-level tags:
  * `aws:cloudformation:logical-id`
  * `aws:cloudformation:stack-id`
  * `aws:cloudformation:stack-name`
* `aws:eks:cluster-name`
* One of the AWS Service Catalog AutoTags:
  * `aws:servicecatalog:portfolioArn`
  * `aws:servicecatalog:productArn`
  * `aws:servicecatalog:provisioningPrincipalArn`
  * `aws:servicecatalog:provisionedProductArn`
  * `aws:servicecatalog:provisioningArtifactIdentifier`
* `AWSApplicationMigrationServiceManaged` with value `mgn.amazonaws.com`
* `AWSElasticDisasterRecoveryManaged` with value `drs.amazonaws.com`
* Both Elastic Beanstalk default environment tags:
  * `elasticbeanstalk:environment-name`
  * `elasticbeanstalk:environment-id`

The CloudFormation tags are included because AWS documents that CloudFormation automatically creates the `aws:cloudformation:logical-id`, `aws:cloudformation:stack-id`, and `aws:cloudformation:stack-name` stack-level tags.

The Amazon EKS tag is included because AWS documents that Amazon EKS creates a default cluster security group when a cluster is created, adds the `aws:eks:cluster-name` tag to that security group, and adds the tag back if it is removed when the cluster is updated. This makes the tag a security-group-specific signal for the EKS-created cluster security group.

The Service Catalog tags are included because AWS documents these AutoTags as automatically applied tags that identify the origin of Service Catalog provisioned resources, and notes that AutoTags can be viewed in downstream services used for provisioning, including Amazon EC2.

The AWS Application Migration Service tag is included because AWS managed policy documentation references `AWSApplicationMigrationServiceManaged` as a request or resource tag for creating and managing EC2 security groups through Application Migration Service. The policy checks for the observed service value `mgn.amazonaws.com` so the tag key alone is not treated as sufficient evidence.

The AWS Elastic Disaster Recovery tag is included because AWS DRS policy documentation references `AWSElasticDisasterRecoveryManaged` as a request or resource tag for creating and managing EC2 security groups through DRS. The policy checks for the observed service value `drs.amazonaws.com` so the tag key alone is not treated as sufficient evidence.

The Elastic Beanstalk tags are included only as a pair because AWS documents `elasticbeanstalk:environment-name` and `elasticbeanstalk:environment-id` as default tags applied by Elastic Beanstalk to environments and to other AWS resources that Elastic Beanstalk creates for the environment. Checking both tags reduces the chance of treating a single copied or customer-created tag as provisioning evidence.

EC2 security groups without one of the supported AWS-managed tag signals are classified as not identified by this automated provisioning tag signal. This result is not evidence by itself that the security group is misconfigured.

## References

1. [CloudFormation resource tagging](https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-properties-resource-tags.html)
2. [View Amazon EKS security group requirements for clusters](https://docs.aws.amazon.com/eks/latest/userguide/sec-group-reqs.html)
3. [AWS Service Catalog AutoTags](https://docs.aws.amazon.com/servicecatalog/latest/adminguide/autotags.html)
4. [AWSApplicationMigrationServiceRolePolicy](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AWSApplicationMigrationServiceRolePolicy.html)
5. [AWSApplicationMigrationEC2Access](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AWSApplicationMigrationEC2Access.html)
6. [AWS Elastic Disaster Recovery full access policy](https://docs.aws.amazon.com/drs/latest/userguide/customer_managed_policies_drs_full_access.html)
7. [Tagging resources in Elastic Beanstalk environments](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.tagging.html)
