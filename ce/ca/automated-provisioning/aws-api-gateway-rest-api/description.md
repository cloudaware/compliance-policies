# Description

Identify AWS API Gateway REST APIs that were provisioned through AWS CloudFormation or AWS Service Catalog.

This policy checks for AWS-reserved tags that identify an API Gateway REST API as a resource provisioned through AWS CloudFormation or AWS Service Catalog.

## Rationale

AWS-managed provisioning tags provide evidence that a REST API is associated with a CloudFormation stack or a Service Catalog provisioned product. This allows to distinguish APIs with supported AWS-managed provisioning indicators from APIs that are not identified by this tag-based method.

## Audit

This policy applies only to API Gateway records with the `restApi` record type.

It classifies an *AWS API Gateway REST API* as identified by automated provisioning evidence when the REST API has at least one of the following AWS-reserved tag keys:

* `aws:cloudformation:logical-id`
* `aws:cloudformation:stack-id`
* `aws:cloudformation:stack-name`
* `aws:servicecatalog:portfolioArn`
* `aws:servicecatalog:productArn`
* `aws:servicecatalog:provisioningPrincipalArn`
* `aws:servicecatalog:provisionedProductArn`
* `aws:servicecatalog:provisioningArtifactIdentifier`

The CloudFormation tags are included because AWS documents that CloudFormation automatically creates the `aws:cloudformation:logical-id`, `aws:cloudformation:stack-id`, and `aws:cloudformation:stack-name` stack-level tags. The Service Catalog tags are included because AWS documents these keys as Service Catalog tags that identify the origin of provisioned resources.

REST APIs without one of the supported AWS-managed provisioning tags are classified as not identified by this automated provisioning tag signal. This result is not evidence by itself that the resource is misconfigured.

## References

1. [CloudFormation resource tagging](https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-properties-resource-tags.html)
2. [AWS Service Catalog tags](https://docs.aws.amazon.com/servicecatalog/latest/adminguide/autotags.html)
