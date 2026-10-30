# Description

Identify AWS Lambda Functions that appear to be associated with AWS-managed automated provisioning or management workflows.

This policy checks for AWS-managed tag signals that can help identify a Lambda function as associated with AWS CloudFormation, AWS Service Catalog, or AWS Serverless Application Model (AWS SAM).

## Rationale

AWS-managed tags can provide evidence that a Lambda function was created by, attached to, or managed through an AWS service workflow. This allows to distinguish Lambda functions with supported AWS-managed provisioning indicators from Lambda functions that are not identified by this tag-based method.

## Audit

This policy classifies an *AWS Lambda Function* as identified by automated provisioning evidence when the function has one of the following supported tag signals:

* One of the AWS CloudFormation stack-level tags:
  * `aws:cloudformation:logical-id`
  * `aws:cloudformation:stack-id`
  * `aws:cloudformation:stack-name`
* One of the AWS Service Catalog AutoTags:
  * `aws:servicecatalog:portfolioArn`
  * `aws:servicecatalog:productArn`
  * `aws:servicecatalog:provisioningPrincipalArn`
  * `aws:servicecatalog:provisionedProductArn`
  * `aws:servicecatalog:provisioningArtifactIdentifier`
* `lambda:createdBy` with value `SAM`

The CloudFormation tags are included because AWS documents that CloudFormation automatically creates the `aws:cloudformation:logical-id`, `aws:cloudformation:stack-id`, and `aws:cloudformation:stack-name` stack-level tags.

The Service Catalog tags are included because AWS documents these AutoTags as automatically applied tags that identify the origin of Service Catalog provisioned resources. Lambda functions are taggable resources, so these tags are treated as Service Catalog evidence only when they are present on the function itself.

The AWS SAM tag is included only when `lambda:createdBy` has the documented value `SAM`. AWS SAM documents that it automatically adds the `lambda:createdBy:SAM` tag to generated Lambda functions. The policy checks the observed key-value form, `lambda:createdBy` with value `SAM`, instead of treating the tag key alone as sufficient evidence.

Lambda functions without one of the supported AWS-managed tag signals are classified as not identified by this automated provisioning tag signal. This result is not evidence by itself that the function is misconfigured.

## References

1. [CloudFormation resource tagging](https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-properties-resource-tags.html)
2. [AWS Service Catalog AutoTags](https://docs.aws.amazon.com/servicecatalog/latest/adminguide/autotags.html)
