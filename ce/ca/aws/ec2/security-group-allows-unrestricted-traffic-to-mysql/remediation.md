# Remediation

## From Command Line

1. Run the following command to remove or modify the unrestricted rule for MySQL access:

```sh
aws ec2 revoke-security-group-ingress \
--region {{region-name}} \
--group-id {{security-group-id}} \
--protocol {{protocol}} \
--port 3306 \
--cidr {{0.0.0.0/0 or ::/0}}
```

- Optionally, run the `authorise-security-group-ingress` command to
create a new rule, specifying a trusted CIDR range instead of `0.0.0.0/0`.

2. Confirm the changes by describing the security group again and ensuring the
unrestricted access rule has been removed or appropriately restricted:

```sh
aws ec2 describe-security-groups \
--region {{region-name}} \
--group-ids {{security-group-id}} \
--query 'SecurityGroups[*].IpPermissions[?FromPort==`3306`].{CIDR:IpRanges[*].CidrIp,Port:FromPort}'
```

3. Monitor MySQL access to ensure it's unaffected by the changes.
