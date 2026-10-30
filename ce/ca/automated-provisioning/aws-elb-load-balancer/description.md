# Description

Identify AWS ELB Load Balancers that appear to be associated with AWS-managed automated provisioning or management workflows.

This policy checks for AWS-managed tag signals that can help identify an ELB load balancer as associated with AWS CloudFormation, AWS Load Balancer Controller, AWS Service Catalog, or AWS Elastic Beanstalk.

## Rationale

AWS-managed provisioning tags can provide evidence that an ELB load balancer was created by, attached to, or managed through an AWS service workflow. This allows to distinguish load balancers with supported AWS-managed provisioning indicators from load balancers that are not identified by this tag-based method.

## Audit

This policy classifies an *AWS ELB Load Balancer* as identified by automated provisioning evidence when the load balancer has one of the following supported tag signals:

* One of the AWS CloudFormation stack-level tags:
  * `aws:cloudformation:logical-id`
  * `aws:cloudformation:stack-id`
  * `aws:cloudformation:stack-name`
* All AWS Load Balancer Controller ingress resource tags:
  * `elbv2.k8s.aws/cluster`
  * `ingress.k8s.aws/stack`
  * `ingress.k8s.aws/resource`
* All AWS Load Balancer Controller service resource tags:
  * `elbv2.k8s.aws/cluster`
  * `service.k8s.aws/stack`
  * `service.k8s.aws/resource`
* One of the AWS Service Catalog AutoTags:
  * `aws:servicecatalog:portfolioArn`
  * `aws:servicecatalog:productArn`
  * `aws:servicecatalog:provisioningPrincipalArn`
  * `aws:servicecatalog:provisionedProductArn`
  * `aws:servicecatalog:provisioningArtifactIdentifier`
* Both Elastic Beanstalk default environment tags:
  * `elasticbeanstalk:environment-name`
  * `elasticbeanstalk:environment-id`

The CloudFormation tags are included because AWS documents that CloudFormation automatically creates the `aws:cloudformation:logical-id`, `aws:cloudformation:stack-id`, and `aws:cloudformation:stack-name` stack-level tags.

The AWS Load Balancer Controller tag sets are included because the controller documentation states that it automatically applies the `elbv2.k8s.aws/cluster`, `ingress.k8s.aws/stack`, and `ingress.k8s.aws/resource` tags to AWS resources it creates for ingress-managed Application Load Balancers, and the `elbv2.k8s.aws/cluster`, `service.k8s.aws/stack`, and `service.k8s.aws/resource` tags to AWS resources it creates for service-managed Network Load Balancers. The policy requires the complete documented tag set for each path so a single Kubernetes-related tag is not treated as sufficient evidence.

The Service Catalog tags are included because AWS documents these AutoTags as automatically applied tags that identify the origin of Service Catalog provisioned resources, and notes that AutoTags can be viewed in downstream services used for provisioning.

The Elastic Beanstalk tags are included only as a pair because AWS documents `elasticbeanstalk:environment-name` and `elasticbeanstalk:environment-id` as default tags applied by Elastic Beanstalk to environments and to other AWS resources that Elastic Beanstalk creates for the environment. Checking both tags reduces the chance of treating a single copied or customer-created tag as provisioning evidence.

ELB load balancers without one of the supported AWS-managed tag signals are classified as not identified by this automated provisioning tag signal. This result is not evidence by itself that the load balancer is misconfigured.

## References

1. [CloudFormation resource tagging](https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-properties-resource-tags.html)
2. [AWS Load Balancer Controller ingress annotations: resource tags](https://kubernetes-sigs.github.io/aws-load-balancer-controller/latest/guide/ingress/annotations/#resource-tags)
3. [AWS Load Balancer Controller service annotations: AWS resource tags](https://kubernetes-sigs.github.io/aws-load-balancer-controller/latest/guide/service/annotations/#aws-resource-tags)
4. [AWS Service Catalog AutoTags](https://docs.aws.amazon.com/servicecatalog/latest/adminguide/autotags.html)
5. [Tagging resources in Elastic Beanstalk environments](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.tagging.html)
