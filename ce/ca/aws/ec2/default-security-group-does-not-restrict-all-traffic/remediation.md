# Remediation

## Security Group Members

Perform the following to implement the prescribed state:

1. Identify AWS resources that exist within the default security group.
2. Create a set of least privilege security groups for those resources.
3. Place the resources in those security groups.
4. Remove the resources noted in #1 from the default security group.

## Security Group State

1. Login to the AWS Management Console at <https://console.aws.amazon.com/vpc/home>.
2. Repeat the next steps for all VPCs - including the default VPC in each AWS region:
3. In the left pane, click `Security Groups`.
4. For each default security group, perform the following:

    - Select the `default` security group.
    - Click the `Inbound Rules` tab.
    - Remove any inbound rules.
    - Click the `Outbound Rules` tab.
    - Remove any Outbound rules.

## Recommended

IAM groups allow you to edit the `name` field. After remediating default groups rules for all VPCs in all regions, edit this field to add text similar to `DO NOT USE. DO NOT ADD RULES`.
