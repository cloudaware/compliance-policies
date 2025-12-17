# Description

This policy identifies AWS ECS Services that are configured to automatically assign public IP addresses to launched tasks. This option is available only when using the `awsvpc` network mode, which is required for the Fargate launch type.

## Rationale

Assigning public IP addresses to ECS tasks allows them to be directly reachable from the public internet. This exposure increases the risk of unauthorized access, including network scanning, brute-force attempts, and exploitation of application vulnerabilities.

Backend services and internal applications should be deployed within private subnets that do not have direct inbound or outbound internet routes. External access should be managed through Load Balancers, while outbound access should be routed through NAT Gateways.

## Audit

This policy marks an *AWS ECS Service* as `INCOMPLIANT` if the `Assign Public IP` configuration is set to **Enabled**.

Inactive ECS Services are marked as `INAPPLICABLE`.
