# Remediation

## From Command Line

1. Run the following command to remove or modify the unrestricted rule for ICMP
access:

```sh
aws ec2 revoke-security-group-ingress \
--region {{region-name}} \
--group-id {{security-group-id}} \
--protocol icmp \
--port {{-1}} \
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
--query 'SecurityGroups[*].IpPermissions[?IpProtocol==`icmp`].{CIDR:IpRanges[*].CidrIp,Port:FromPort}'
```

3. After applying these changes, monitor the network for any issues related to legitimate use of ICMP, such as network diagnostics or monitoring tools, to ensure no unintended disruptions occur.
