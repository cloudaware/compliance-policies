# Remediation

## From AWS CLI

To remove a specific security group rule that allows public (0.0.0.0/0) access to an administrative port, use the following command:

```sh
aws ec2 revoke-security-group-ingress \
    --group-id {{sg-id}} \
    --protocol {{protocol}} \
    --port {{port/min-max}} \
    --cidr 0.0.0.0/0
```

**Note**: You must revoke the entire rule as it was originally defined — that is, exact protocol, full port range, and CIDR block — and if needed, recreate any safe sub-rules after that.

## From Console

Perform the following to implement the prescribed state:

1. Login to the AWS Management Console at <https://console.aws.amazon.com/vpc/home>.
2. In the left pane, click `Security Groups`.
3. For each security group, perform the following:
   - Select the security group.
   - Click the `Inbound Rules` tab.
   - Click the `Edit inbound rules` button.
   - Identify the rules to be edited or removed.
   - Either:
     - A. update the Source field to a range other than 0.0.0.0/0, or,
     - B. Click `Delete` to remove the offending inbound rule.
   - Click `Save rules`.
