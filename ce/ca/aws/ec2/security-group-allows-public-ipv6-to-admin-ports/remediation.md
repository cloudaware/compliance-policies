# Remediation

## From AWS CLI

### Inline JSON example

```sh
aws ec2 revoke-security-group-ingress \
    --group-id {{sg-id}} \
    --ip-permissions '[{"IpProtocol": "{{tcp}}","FromPort": {{22}},"ToPort": {{22}},"Ipv6Ranges": [{ "CidrIpv6": "::/0" }]}]'
```

### Using a file

Extract the existing rule to a file:

```sh
aws ec2 describe-security-groups \
    --group-id {{sg-id}} \
    --query "SecurityGroups[0].IpPermissions[?Ipv6Ranges[?CidrIpv6=='::/0']]" \
    --output json > {{revoke-rule}}.json
```

Revoke it by referencing the file:

```sh
aws ec2 revoke-security-group-ingress \
    --group-id {{sg-id}} \
    --ip-permissions file://{{revoke-rule}}.json
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
      - A. update the Source field to a range other than ::/0, or,
      - B. Click `Delete` to remove the offending inbound rule.

    - Click `Save rules`.
