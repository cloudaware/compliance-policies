# Description

Identify AWS VPC Subnets that appear to be associated with AWS CloudFormation or AWS Service Catalog provisioning.

This policy checks for AWS-managed tag signals that can help identify a VPC subnet as associated with AWS CloudFormation or AWS Service Catalog. It does not require every subnet to have these tags, and it does not treat customer-defined tags as proof of provisioning origin.

## Rationale

AWS-managed provisioning tags can provide evidence that a VPC subnet was created by, attached to, or managed through an AWS service workflow. This allows to distinguish subnets with supported AWS-managed provisioning indicators from subnets that are not identified by this tag-based method.

## Audit

This policy classifies an *AWS VPC Subnet* as identified by automated provisioning evidence when the subnet has one of the following supported tag signals:

* All AWS CloudFormation stack-level tags:
  * `aws:cloudformation:logical-id`
  * `aws:cloudformation:stack-id`
  * `aws:cloudformation:stack-name`
* One of the AWS Service Catalog AutoTags:
  * `aws:servicecatalog:portfolioArn`
  * `aws:servicecatalog:productArn`
  * `aws:servicecatalog:provisioningPrincipalArn`
  * `aws:servicecatalog:provisionedProductArn`
  * `aws:servicecatalog:provisioningArtifactIdentifier`

The CloudFormation tags are included because AWS documents that CloudFormation automatically creates the `aws:cloudformation:logical-id`, `aws:cloudformation:stack-id`, and `aws:cloudformation:stack-name` stack-level tags.

The Service Catalog tags are included because AWS documents these AutoTags as automatically applied tags that identify the origin of Service Catalog provisioned resources, and notes that AutoTags can be viewed in downstream services used for provisioning, including Amazon EC2.

VPC subnets without one of the supported AWS-managed provisioning tag signals are classified as not identified by this automated provisioning tag signal. This result is not evidence by itself that the subnet is misconfigured.

## References

1. [CloudFormation resource tagging](https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-properties-resource-tags.html)
3. [AWS Service Catalog AutoTags](https://docs.aws.amazon.com/servicecatalog/latest/adminguide/autotags.html)
