# Description

A VPC comes with a default security group whose initial settings deny all inbound traffic, allow all outbound traffic, and allow all traffic between instances assigned to the security group. If you don't specify a security group when you launch an instance, the instance is automatically assigned to this default security group. Security groups provide stateful filtering of ingress/egress network traffic to AWS resources. It is recommended that the default security group restrict all traffic.

The default VPC in every region should have its default security group updated to comply. Any newly created VPCs will automatically contain a default security group that will need remediation to comply with this recommendation.

**NOTE**: When implementing this recommendation, VPC flow logging is invaluable in determining the least privilege port access required by systems to work properly because it can log all packet acceptances and rejections occurring under the current security groups. This dramatically reduces the primary barrier to least privilege engineering - discovering the minimum ports required by systems in the environment. Even if the VPC flow logging recommendation in this benchmark is not adopted as a permanent security measure, it should be used during any period of discovery and engineering for least privileged security groups.

## Rationale

Configuring all VPC default security groups to restrict all traffic will encourage least privilege security group development and mindful placement of AWS resources into security groups which will in-turn reduce the exposure of those resources.

## Impact

Implementing this recommendation in an existing VPC containing operating resources requires extremely careful migration planning as the default security groups are likely to be enabling many ports that are unknown. Enabling VPC flow logging (of accepts) in an existing environment that is known to be breach free will reveal the current pattern of ports being used for each instance to communicate successfully.

## Audit

Perform the following to determine if the account is configured as prescribed:

### Security Group State

1. Login to the AWS Management Console at <https://console.aws.amazon.com/vpc/home>.
2. Repeat the next steps for all VPCs - including the default VPC in each AWS region:
3. In the left pane, click `Security Groups`.
4. For each default security group, perform the following:
   - Select the `default` security group.
   - Click the `Inbound Rules` tab.
   - Ensure no rule exist.
   - Click the `Outbound Rules` tab.
   - Ensure no rules exist.

### Security Group Members

1. Login to the AWS Management Console at <https://console.aws.amazon.com/vpc/home>.
2. Repeat the next steps for all default groups in all VPCs - including the default VPC in each AWS region:
3. In the left pane, click `Security Groups`.
4. Copy the id of the default security group.
5. Change to the EC2 Management Console at <https://console.aws.amazon.com/ec2/v2/home>.
6. In the filter column type `Security Group ID : < security group id from #4 >`.

## References

1. CCE-79201-0
2. <https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-network-security.html>
3. <https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-security-groups.html#default-security-group>
