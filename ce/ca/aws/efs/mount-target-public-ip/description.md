# Description

This policy identifies AWS EFS Mount Targets that are deployed in subnets where the **Map Public IP On Launch** setting is enabled. EFS file systems are designed to be accessed from within a VPC or through private connectivity options such as VPN or AWS Direct Connect, and do not require exposure to the public internet.

## Rationale

Deploying EFS mount targets in subnets configured for public-facing resources can unnecessarily increase the attack surface of the storage environment. While EFS mount targets do not receive public IP addresses directly, they rely on ENI that inherit the network characteristics of the associated subnet. A subnet with automatic public IP assignment typically indicates intent for internet-facing workloads.

Maintaining strict network segmentation by placing storage resources in private subnets helps ensure proper isolation, reduces the risk of unintended exposure, and aligns with security best practices for protecting sensitive data.

## Audit

This policy flags an *AWS EFS Mount Target* as `INCOMPLIANT` if the associated *Subnet* has `Map Public IP On Launch` set to **true**.
