# Description

This policy identifies AWS Lambda functions that are not configured to run within a Virtual Private Cloud (VPC). By default, Lambda functions run in a managed AWS environment and do not have access to private resources within your VPC.

**Lambda@Edge** functions do not support VPC configuration and therefore cannot be attached to a VPC.

## Rationale

Running Lambda functions within a VPC enables secure access to private resources such as Amazon RDS, Amazon ElastiCache, and internal APIs. It also allows the use of security groups and network ACLs, and it enables outbound traffic to be routed through a NAT Gateway for IP-based allowlisting.

## Audit

This policy flags an *AWS Lambda Function* as `INCOMPLIANT` when the `VPC ID` field is **empty**.

*Lambda@Edge* functions are marked as `INAPPLICABLE`, as VPC attachment is not supported for Lambda@Edge.
