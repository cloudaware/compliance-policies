# Description

Identify AWS S3 Buckets that appear to be associated with AWS CloudFormation or AWS Service Catalog provisioning.

This policy checks for AWS-managed tag signals that can help identify an S3 bucket as associated with AWS CloudFormation or AWS Service Catalog.

## Rationale

AWS-managed provisioning tags provide evidence that an S3 bucket is associated with a CloudFormation stack or a Service Catalog provisioned product. This allows to distinguish buckets with supported AWS-managed provisioning indicators from buckets that are not identified by this tag-based method.

## Audit

This policy classifies an *AWS S3 Bucket* as identified by automated provisioning evidence when the bucket has at least one of the following AWS-managed tag keys:

* `aws:cloudformation:logical-id`
* `aws:cloudformation:stack-id`
* `aws:cloudformation:stack-name`
* `aws:servicecatalog:portfolioArn`
* `aws:servicecatalog:productArn`
* `aws:servicecatalog:provisioningPrincipalArn`
* `aws:servicecatalog:provisionedProductArn`
* `aws:servicecatalog:provisioningArtifactIdentifier`

The CloudFormation tags are included because AWS documents that CloudFormation automatically creates the `aws:cloudformation:logical-id`, `aws:cloudformation:stack-id`, and `aws:cloudformation:stack-name` stack-level tags.

The Service Catalog tags are included because AWS documents these AutoTags as automatically applied tags that identify the origin of provisioned resources, and notes that AutoTags can be viewed in downstream services used for provisioning, including Amazon S3.

S3 buckets without one of the supported AWS-managed provisioning tags are classified as not identified by this automated provisioning tag signal. This result is not evidence by itself that the bucket is misconfigured.

## References

1. [CloudFormation resource tagging](https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-properties-resource-tags.html)
2. [AWS Service Catalog AutoTags](https://docs.aws.amazon.com/servicecatalog/latest/adminguide/autotags.html)
