# Description

Ensure that AWS EC2 Auto Scaling Groups (ASGs) associated with Elastic Load Balancers (ELBs) are configured to use **ELB health checks** rather than the default EC2 health checks.

## Rationale

ELB health checks provide a more accurate and application-aware mechanism for determining instance health compared to standard EC2 status checks. By integrating directly with the load balancer, ELB health checks reflect the actual ability of instances to serve traffic. This enables Auto Scaling Groups to make more informed scaling and replacement decisions, leading to faster recovery from failures and improved application availability.

Configuring ASGs to use ELB health checks ensures that scaling decisions are based on the same health criteria used by the load balancer itself, promoting more consistent and reliable traffic distribution.

## Impact

May introduce additional configuration and management overhead compared to the default EC2 health check type.

## Audit

This policy flags an *AWS EC2 Auto Scaling Group* as `INCOMPLIANT` if:

- There is a related *AWS EC2 Auto Scaling Group Tfc.Src.Link* object, with the `Traffic Source Type` field set to **elb** or **elbv2**, and
- The ASG `Health Check Type` field is not set to ELB.

An ASG is marked as `COMPLIANT` if the `Health Check Type` is set to ELB under the same conditions.

An ASG is marked as `INAPPLICABLE` if `Traffic Source Type` is not **elb** or **elbv2**, or *AWS EC2 Auto Scaling Group Tfc.Src.Link* does not exist in the CMDB.
