# Description

This policy identifies AWS Redshift Clusters that have **Enhanced VPC Routing** disabled. When enabled, this feature forces all `COPY` and `UNLOAD` traffic between the cluster and data repositories (such as Amazon S3) to flow through the associated VPC.

## Rationale

When Enhanced VPC Routing is disabled, Amazon Redshift may route traffic over the public internet when communicating with other AWS services. Enabling this feature ensures that data transfers remain within the AWS network and allows you to enforce network-level controls using VPC security groups and network access control lists. This improves security, provides better visibility through VPC Flow Logs, and can help reduce data egress exposure.

## Impact

Because Enhanced VPC Routing changes how Amazon Redshift accesses external resources, `COPY` and `UNLOAD` operations may fail if the VPC is not configured correctly. You must explicitly establish a valid network path between the cluster's VPC and the target data resources.

There is no additional charge for enabling Enhanced VPC Routing. However, standard data transfer charges may apply in certain scenarios, for example:

- `UNLOAD` operations to Amazon S3 buckets in a different AWS Region
- `COPY` operations from Amazon EMR
- Secure Shell (SSH) access using public IP addresses

## Audit

This policy flags an *AWS Redshift Cluster* as `INCOMPLIANT` if `Enhanced VPC Routing` is set to **Disabled**.

*Clusters* that are not in the **available** state are marked as `INAPPLICABLE`.
