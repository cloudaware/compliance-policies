# Description

Security groups provide stateful filtering of ingress and egress network traffic to AWS resources. It is recommended that no security group allows unrestricted ingress access to remote server administration ports, such as SSH to port `22` and RDP to port `3389`.

## Rationale

Public access to remote server administration ports, such as 22 and 3389, increases resource attack surface and unnecessarily raises the risk of resource compromise.

## Impact

When updating an existing environment, ensure that administrators have access to remote server administration ports through another mechanism before removing access by deleting the ::/0 inbound rule.

## Audit

Perform the following to determine if the account is configured as prescribed:

1. Login to the AWS Management Console at <https://console.aws.amazon.com/vpc/home>.
2. In the left pane, click `Security Groups`.
3. For each security group, perform the following:
   - Select the security group.
   - Click the `Inbound Rules` tab.
   - Ensure no rule exists that has a port range that includes port `22`, `3389`, or other remote server administration ports for your environment and has a `Source` of `::/0`.

**Note**: A Port value of `ALL` or a port range such as 0-1024 are inclusive of port 22, 3389, and other remote server administration ports.

## References

1. <https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-security-groups.html#deleting-security-group-rule>
