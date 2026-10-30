# Description

This policy identifies AWS SageMaker Notebook Instances that are **not deployed within a Virtual Private Cloud (VPC)**.

## Rationale

By default, SageMaker notebook instances run in an AWS-managed network environment with direct access to the public internet. Deploying notebook instances within a customer-managed VPC provides enhanced security, control, and visibility over network traffic.

Key benefits include:

1. **Network Isolation**: The notebook instance can communicate with other AWS resources (such as Amazon RDS or EMR) using private IP addresses.
2. **Access Control**: Inbound and outbound traffic can be tightly controlled using Security Groups and Network ACLs.
3. **Private Connectivity**: AWS services (for example, Amazon S3) can be accessed through VPC Endpoints, ensuring traffic remains within the AWS global network.
4. **Monitoring and Auditing**: Network activity can be monitored and analyzed using VPC Flow Logs.

## Impact

Remediation requires provisioning a new SageMaker notebook instance within the desired VPC and subnet, as the VPC configuration cannot be modified after the notebook instance is created. This process may involve migrating data, notebooks, and configurations from the existing instance to the newly created one.

The target VPC must be preconfigured with the required subnets and security groups. If the notebook instance requires outbound internet access, the VPC must also include a NAT Gateway or equivalent routing configuration.

## Audit

This policy flags an *AWS SageMaker Notebook Instance* as `INCOMPLIANT` when the `Subnet` field is **empty**, indicating that the instance is not associated with a VPC.

*Notebook Instances* that are not in the **InService** `Status` are marked as `INAPPLICABLE`.
