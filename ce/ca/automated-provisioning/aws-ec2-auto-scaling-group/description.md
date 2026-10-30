# Description

Identify AWS EC2 Auto Scaling Groups that appear to be associated with AWS-managed provisioning workflows.

This policy checks for AWS-reserved or AWS service default tags that can help identify an Auto Scaling group as associated with AWS CloudFormation, AWS Service Catalog, Amazon EKS, or AWS Elastic Beanstalk.

## Rationale

AWS-managed provisioning tags provide evidence that an Auto Scaling group is associated with a CloudFormation stack, a Service Catalog provisioned product, an Amazon EKS managed node group, or an Elastic Beanstalk environment. This allows to distinguish Auto Scaling groups with supported AWS-managed provisioning indicators from Auto Scaling groups that are not identified by this tag-based method.

## Audit

This policy classifies an *AWS EC2 Auto Scaling Group* as identified by automated provisioning evidence when the Auto Scaling group has at least one of the following supported tag signals:

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
* Both Amazon EKS managed node group tags:
  * `eks:cluster-name`
  * `eks:nodegroup-name`
* Both Elastic Beanstalk default environment tags:
  * `elasticbeanstalk:environment-name`
  * `elasticbeanstalk:environment-id`

The CloudFormation tags are included because AWS documents that CloudFormation automatically creates the `aws:cloudformation:logical-id`, `aws:cloudformation:stack-id`, and `aws:cloudformation:stack-name` stack-level tags. Auto Scaling groups are included because AWS documents `AWS::AutoScaling::AutoScalingGroup` as a CloudFormation resource with a `Tags` property.

The Service Catalog tags are included because AWS documents these AutoTags as automatically applied tags that identify the origin of Service Catalog provisioned resources, and notes that AutoTags can be viewed in downstream services used for provisioning.

The Amazon EKS tags are included as a pair because AWS documents that managed node groups automate node provisioning, that every managed node is provisioned as part of an Auto Scaling group managed by Amazon EKS, and that Amazon EKS tags managed node group resources for Cluster Autoscaler use. Requiring both tags keeps the signal tied to the EKS managed node group relationship rather than a single broad cluster tag.

Cluster Autoscaler tags such as `k8s.io/cluster-autoscaler/enabled`, `k8s.io/cluster-autoscaler/<suffix>`, `k8s.io/cluster-autoscaler/node-template/<suffix>`, and `kubernetes.io/cluster/<suffix>` are not checked as standalone signals. These tags are commonly used for Kubernetes autoscaler discovery and node template metadata, but their suffixes can refer to cluster names, labels, or other Kubernetes-specific components. They do not by themselves identify the AWS provisioning source as narrowly as the EKS managed node group tag pair.

The Elastic Beanstalk tags are included only as a pair because AWS documents `elasticbeanstalk:environment-name` and `elasticbeanstalk:environment-id` as default tags applied by Elastic Beanstalk to environments and to other AWS resources that Elastic Beanstalk creates for the environment. Requiring both tags reduces the chance of treating a single copied or customer-created tag as provisioning evidence.

Auto Scaling groups without one of the supported AWS-managed provisioning tag signals are classified as not identified by this automated provisioning tag signal. This result is not evidence by itself that the Auto Scaling group is misconfigured.

## References

1. [CloudFormation resource tagging](https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-properties-resource-tags.html)
2. [AWS Service Catalog AutoTags](https://docs.aws.amazon.com/servicecatalog/latest/adminguide/autotags.html)
3. [Amazon EKS managed node groups](https://docs.aws.amazon.com/eks/latest/userguide/managed-node-groups.html)
4. [Tagging resources in Elastic Beanstalk environments](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.tagging.html)
