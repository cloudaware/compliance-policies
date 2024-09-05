# Description

EC2 Instances without a public IPv4/IPv6 address are unable to connect to the internet through the Internet Gateway.

If an EC2 Instance is intended to be public, it is necessary to assign it a public IP address.
It is advisable to migrate an EC2 instance to a private subnet, if it does not require internet access.

In case the subnet is misconfigured, consider removing the direct route to an Internet Gateway within the public subnet consequently making it private.

## Rational

It is recommended to use a `Bastion Host` or `NAT Device` to provide internet access to EC2 instances in a private subnet.

- A Bastion Host serves as a secure entry point for SSH or RDP access, allowing administrators to manage instances without exposing them directly to the internet.
- Similarly, a NAT Device enables instances in a private subnet to initiate outbound traffic to the internet while preventing unsolicited inbound connections. These approaches improve security by controlling access points and minimizing the attack surface.

## Impact

EC2 Instances in a public subnet without a public IP address indicate a potential misconfiguration that can lead to several issues.

This can result in security breaches, a convoluted network architecture, complicated management and troubleshooting processes.

For example, malicious actor might gain unauthorized access to the virtual machine or the instance may unintentionally become inaccessible, disrupting service availability and operational continuity.

## Audit

The EC2 Instance is marked as `INCOMPLIANT` under two conditions:

1. The `EC2 Instance` resides in a `VPC Subnet` with a ***Custom*** `Route Table` that contains a `Route` with a `Gateway Id` starting with **igw-**.
2. The `EC2 Instance` resides in a `VPC Subnet` with the implicit ***Main*** `Route Table` that contains a `Route` with a `Gateway Id` starting with **igw-**.

If the `EC2 Instance` has a public IP address or does not belong to a subnet, such an instance is classified as `INAPPLICABLE`.
