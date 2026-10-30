# Description

Identify AWS EC2 Launch Templates that appear to be associated with AWS-managed provisioning or management workflows.

This policy checks for AWS-managed tag signals that can help identify an EC2 launch template as associated with AWS CloudFormation, AWS Service Catalog, Amazon EKS managed node groups, AWS Application Migration Service, or AWS Elastic Disaster Recovery.

## Rationale

AWS-managed tags can provide evidence that an EC2 launch template was created by, attached to, or managed through an AWS service workflow. This allows to distinguish launch templates with supported AWS-managed provisioning indicators from launch templates that are not identified by this tag-based method.

## Audit

This policy classifies an *AWS EC2 Launch Template* as identified by automated provisioning evidence when the launch template has one of the following supported tag signals:

* One of the AWS CloudFormation stack-level tags:
  * `aws:cloudformation:logical-id`
  * `aws:cloudformation:stack-id`
  * `aws:cloudformation:stack-name`
* Both Amazon EKS managed node group tags:
  * `eks:cluster-name`
  * `eks:nodegroup-name`
* One of the AWS Service Catalog AutoTags:
  * `aws:servicecatalog:portfolioArn`
  * `aws:servicecatalog:productArn`
  * `aws:servicecatalog:provisioningPrincipalArn`
  * `aws:servicecatalog:provisionedProductArn`
  * `aws:servicecatalog:provisioningArtifactIdentifier`
* `AWSApplicationMigrationServiceManaged` with value `mgn.amazonaws.com`
* `AWSElasticDisasterRecoveryManaged` with value `drs.amazonaws.com`

The CloudFormation tags are included because AWS documents that CloudFormation automatically creates the `aws:cloudformation:logical-id`, `aws:cloudformation:stack-id`, and `aws:cloudformation:stack-name` stack-level tags.

The Service Catalog tags are included because AWS documents these AutoTags as automatically applied tags that identify the origin of Service Catalog provisioned resources, and notes that AutoTags can be viewed in downstream services used for provisioning, including Amazon EC2.

The Amazon EKS managed node group tags are included as a pair because AWS documents that managed node groups create and manage EC2 instances, that every managed node is provisioned as part of an Auto Scaling group managed by Amazon EKS, and that managed node groups are always deployed with a launch template. If a customer does not provide a launch template, Amazon EKS creates one automatically in the customer's account.

The AWS Application Migration Service tag is included because AWS managed policy documentation references `AWSApplicationMigrationServiceManaged` as a request or resource tag for creating, modifying, and deleting EC2 launch templates through Application Migration Service. The policy checks for the observed service value `mgn.amazonaws.com` so the tag key alone is not treated as sufficient evidence.

The AWS Elastic Disaster Recovery tag is included because AWS DRS policy documentation references `AWSElasticDisasterRecoveryManaged` as a request or resource tag for creating, modifying, tagging, and deleting EC2 launch templates through DRS. The policy checks for the observed service value `drs.amazonaws.com` so the tag key alone is not treated as sufficient evidence.

EC2 launch templates without one of the supported AWS-managed tag signals are classified as not identified by this automated provisioning tag signal. This result is not evidence by itself that the launch template is misconfigured.

## References

1. [CloudFormation resource tagging](https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-properties-resource-tags.html)
2. [AWS Service Catalog AutoTags](https://docs.aws.amazon.com/servicecatalog/latest/adminguide/autotags.html)
3. [Amazon EKS managed node groups](https://docs.aws.amazon.com/eks/latest/userguide/managed-node-groups.html)
4. [Customize managed nodes with launch templates](https://docs.aws.amazon.com/eks/latest/userguide/launch-templates.html)
5. [AWSApplicationMigrationServiceRolePolicy](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AWSApplicationMigrationServiceRolePolicy.html)
6. [AWSApplicationMigrationEC2Access](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AWSApplicationMigrationEC2Access.html)
7. [AWS Elastic Disaster Recovery full access policy](https://docs.aws.amazon.com/drs/latest/userguide/customer_managed_policies_drs_full_access.html)
