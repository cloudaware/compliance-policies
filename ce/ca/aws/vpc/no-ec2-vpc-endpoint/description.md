# Description

Ensures that Amazon VPCs are configured with a VPC endpoint for the Amazon EC2 service. A VPC endpoint enables private connectivity between your VPC and supported AWS services without the need for an internet gateway, NAT device, VPN connection, or AWS Direct Connect.

## Rationale

Using VPC endpoints for services such as EC2 enhances security by ensuring all traffic between your VPC and the EC2 service remains within the AWS network. This prevents data exposure to the public internet, reducing the risk of interception and external attacks. Additionally, it improves reliability and helps maintain consistent network performance.

## Impact

Provisioning VPC endpoints may result in additional costs. Charges apply for each hour an interface VPC endpoint is active in an Availability Zone, as well as per GB of data processed.

## Audit

This policy flags an *AWS VPC* as `INCOMPLIANT` if it **contains** at least one *EC2 Instance* but does **not** contain an active *VPC Endpoint* with `Endpoint Service ID` set to **ec2**.

A *VPC* is marked as `INAPPLICABLE` if it does not contain any *EC2 Instances*.
