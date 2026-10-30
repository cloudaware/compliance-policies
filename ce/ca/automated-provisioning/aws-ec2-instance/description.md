# Description

Identify AWS EC2 Instances that appear to be associated with AWS-managed provisioning or management workflows.

This policy checks for AWS-managed tag signals that can help identify an EC2 instance as associated with AWS CloudFormation, EC2 Auto Scaling, EC2 launch templates, EC2 Fleet, Amazon EMR, Amazon EKS managed node groups, AWS Service Catalog, AWS Application Migration Service, AWS Elastic Disaster Recovery, or AWS Elastic Beanstalk.

## Rationale

AWS-managed tags can provide evidence that an EC2 instance was created by, attached to, or managed through an AWS service workflow. This allows to distinguish EC2 instances with supported AWS-managed provisioning indicators from instances that are not identified by this tag-based method.

## Audit

This policy classifies an *AWS EC2 Instance* as identified by automated provisioning evidence when the instance has one of the following supported tag signals:

* One of the AWS CloudFormation stack-level tags:
  * `aws:cloudformation:logical-id`
  * `aws:cloudformation:stack-id`
  * `aws:cloudformation:stack-name`
* `aws:autoscaling:groupName`
* Both AWS EC2 launch template tags:
  * `aws:ec2launchtemplate:id`
  * `aws:ec2launchtemplate:version`
* `aws:ec2:fleet-id`
* Both Amazon EMR system tags:
  * `aws:elasticmapreduce:job-flow-id`
  * `aws:elasticmapreduce:instance-group-role`
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
* Both Elastic Beanstalk default environment tags:
  * `elasticbeanstalk:environment-name`
  * `elasticbeanstalk:environment-id`

The CloudFormation tags are included because AWS documents that CloudFormation automatically creates the `aws:cloudformation:logical-id`, `aws:cloudformation:stack-id`, and `aws:cloudformation:stack-name` stack-level tags.

The Auto Scaling tag is included because AWS documents that an Auto Scaling group automatically adds the `aws:autoscaling:groupName` tag to instances that it launches or attaches. The tag is AWS-reserved because it uses the `aws:` prefix.

The EC2 Fleet tag is included because AWS documents EC2 Fleet as an EC2 launch mechanism, and the `aws:` prefix identifies the key as AWS-reserved.

The Amazon EMR tags are included as a pair because AWS documents `aws:elasticmapreduce:job-flow-id` and `aws:elasticmapreduce:instance-group-role` as system tags used to identify an EC2 instance that is part of an Amazon EMR cluster. Checking both tags keeps the signal tied to EMR cluster membership rather than a single copied tag.

The Amazon EKS managed node group tags are included as a pair because AWS documents that managed node groups automate the provisioning and lifecycle management of EC2 instances, that every managed node is provisioned as part of an Auto Scaling group managed by Amazon EKS, and that nodes launched as part of a managed node group are automatically tagged for Cluster Autoscaler auto-discovery. Checking both tags keeps the signal tied to the EKS managed node group relationship rather than a single broad cluster tag.

The Service Catalog tags are included because AWS documents these AutoTags as automatically applied tags that identify the origin of Service Catalog provisioned resources, and notes that AutoTags can be viewed in downstream services used for provisioning, including Amazon EC2.

The AWS Application Migration Service tag is included because AWS documents `AWSApplicationMigrationServiceManaged` as a service-created tag that cannot be changed or deleted, and AWS managed policy documentation references this tag on EC2 instances launched or managed through Application Migration Service. The policy checks for the observed service value `mgn.amazonaws.com` so the tag key alone is not treated as sufficient evidence.

The AWS Elastic Disaster Recovery tag is included because AWS DRS policy documentation references `AWSElasticDisasterRecoveryManaged` as a resource or request tag for EC2 instances launched or managed through DRS. The policy checks for the observed service value `drs.amazonaws.com` so the tag key alone is not treated as sufficient evidence.

The Elastic Beanstalk tags are included only as a pair because AWS documents `elasticbeanstalk:environment-name` and `elasticbeanstalk:environment-id` as default tags applied by Elastic Beanstalk to environments and to other AWS resources that Elastic Beanstalk creates for the environment. Checking both tags reduces the chance of treating a single copied or customer-created tag as provisioning evidence.

EC2 instances without one of the supported AWS-managed tag signals are classified as not identified by this automated provisioning tag signal. This result is not evidence by itself that the instance is misconfigured.

## References

1. [CloudFormation resource tagging](https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-properties-resource-tags.html)
2. [Launch an instance from a launch template](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-launch-templates.html)
3. [Launch instances using an EC2 Fleet](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-fleet.html)
4. [Tag and categorize Amazon EMR cluster resources](https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-plan-tags.html)
5. [Amazon EKS managed node groups](https://docs.aws.amazon.com/eks/latest/userguide/managed-node-groups.html)
6. [AWS Service Catalog AutoTags](https://docs.aws.amazon.com/servicecatalog/latest/adminguide/autotags.html)
7. [AWS Application Migration Service service-created tags](https://docs.aws.amazon.com/mgn/latest/ug/configuration-editing.html)
8. [AWSApplicationMigrationServiceRolePolicy](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AWSApplicationMigrationServiceRolePolicy.html)
9. [AWSApplicationMigrationEC2Access](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AWSApplicationMigrationEC2Access.html)
10. [AWS Elastic Disaster Recovery full access policy](https://docs.aws.amazon.com/drs/latest/userguide/customer_managed_policies_drs_full_access.html)
11. [Tagging resources in Elastic Beanstalk environments](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.tagging.html)
