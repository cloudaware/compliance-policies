# Description

Ensure that Auto Scaling Group launch configuration is not configured to assign public IP addresses to EC2 instances launched behind a load balancer.

If you do not set `Associate Public IP Address`, the default is to use the **auto-assign public IP settings** of the subnets that your instances are launched into.

## Rationale

When an EC2 instance is launched with a public IP while also being registered behind an ELB, it may become directly addressable from the internet, potentially circumventing the centralized control point provided by the ELB. This undermines security postures such as centralized logging, access control policies, WAF protection, and TLS termination.

## Audit

This policy flags an *AWS EC2 Auto Scaling Group* as `INCOMPLIANT` if the following conditions are met:

- It is associated with a load balancer, and
- Its *AWS EC2 Launch Configuration* (accessible via the `Launch Configuration` field) has the `Associate Public IP Address` checkbox set to **true**.

An Auto Scaling Group is marked as `INAPPLICABLE` in either of the following cases:

1. It is not associated with a load balancer. This is determined by the related *AWS EC2 Auto Scaling Group Tfc.Src.Link* object, where either:

    - The `Traffic Source Type` field is not set to **elb** or **elbv2**, or
    - The *ASG Tfc.Src.Link* object does not exist in the CMDB.

2. The `Launch Configuration Name` field is **empty**, indicating that the ASG uses a launch template instead of a launch configuration.

An *Auto Scaling Group* is marked as `UNDETERMINED` if the *Launch Configuration* is in use but deleted/non-existent in the CMDB.
