# Description

This policy checks if any AWS EC2 Instance with a public IP address is deployed within a default subnet.

By default, a default subnet is configured as a public subnet because the main route table is associated with an internet gateway, enabling outbound traffic to the internet.

Instances launched into a default subnet are automatically assigned a public IPv4 address, a private IPv4 address, and both public and private DNS hostnames.

## Rationale

Deploying instances in default subnets can inadvertently expose them to the public internet. Default VPCs and subnets are intended for ease of deployment and testing, rather than for building secure, production-grade environments.

Production workloads and sensitive resources should always be provisioned in custom VPCs with dedicated subnets, where routing, access, and security controls are explicitly defined and managed.

## Audit

This policy flags an *AWS EC2 Instance* as `INCOMPLIANT` if it has a `Public IP Address` and resides in a *VPC Subnet* where both `Default For AZ` and `Map Public IP On Launch` checkboxes are set to **true**.

Instances are marked as `COMPLIANT` if they:

- Do not have a Public IP Address.
- Use an Elastic IP.
- Run in a custom subnet.
- Run in a default subnet with Public IP auto-assignment disabled.
