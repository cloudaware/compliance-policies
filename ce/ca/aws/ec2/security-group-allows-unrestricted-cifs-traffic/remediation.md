# Remediation

## From Console

1. Login to the AWS Management Console.
2. Navigate to the EC2 Dashboard and select the Security Groups section under `Network & Security`.
3. Identify the security group that allows unrestricted ingress on port 445.
4. Select the security group and click the `Edit Inbound Rules` button.
5. Locate the rule allowing unrestricted access on port 445 (typically listed as `0.0.0.0/0` or `::/0`).
6. Modify the rule to restrict access to specific IP ranges or trusted networks only.
7. Save the changes to the security group.

## From Command Line

1. Run the following command to remove or modify the unrestricted rule for CIFS
access:

```sh
aws ec2 revoke-security-group-ingress --region <region-name> --group-id <security-group-id> --protocol tcp --port 445 --cidr 0.0.0.0/0
```

- Optionally, run the `authorise-security-group-ingress` command to
create a new rule, specifying a trusted CIDR range instead of `0.0.0.0/0`.

2. Confirm the changes by describing the security group again and ensuring the
unrestricted access rule has been removed or appropriately restricted:

```sh
aws ec2 describe-security-groups --region <region-name> --group-ids <security-group-id> --query 'SecurityGroups[*].IpPermissions[?FromPort==`445`].{CIDR:IpRanges[*].CidrIp,Port:FromPort}'
```

3. Repeat the remediation for other security groups and regions as necessary.
