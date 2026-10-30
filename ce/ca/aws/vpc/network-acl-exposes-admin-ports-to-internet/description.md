# Description

The Network Access Control List (NACL) function provides stateless filtering of ingress and egress network traffic to AWS resources. It is recommended that no NACL allows unrestricted ingress access to remote server administration ports, such as SSH on port 22 and RDP on port 3389, using TCP (6), UDP (17), or ALL (-1) protocols.

## Rationale

Public access to remote server administration ports, such as 22 and 3389, increases the attack surface and raises the risk of resource compromise.

## Audit

### From Console

Perform the following to determine if the account is configured as prescribed:

1. Log in to the AWS Management Console at <https://console.aws.amazon.com/vpc/home>.
2. In the left pane, click `Network ACLs`.
3. For each network ACL, perform the following:

   - Select the network ACL.
   - Click the `Inbound Rules` tab.
   - Ensure no rule exists that has a port range that includes port `22`, `3389`, using the protocols TCP (6), UDP (17) or ALL (-1) or other remote server administration ports for your environment and has a `Source` of `0.0.0.0/0` and shows `ALLOW`.

**Note**: A Port value of `ALL` or a port range such as `0-1024` includes port `22`, `3389`, and other remote server administration ports.

## References

1. <https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html>
2. <https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Security.html#VPC_Security_Comparison>
