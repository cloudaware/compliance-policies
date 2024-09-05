# Remediation

Remove and add route table entries to ensure that the least number of subnets or hosts as is required to accomplish the purpose for peering are routable.

## From Command Line

1. For each `<route_table_id>` containing routes non compliant with your routing policy (which grants more than desired `least access`), delete the non compliant route:

```sh
aws ec2 delete-route --route-table-id <route_table_id> --destination-cidr-block <non_compliant_destination_CIDR>
```

2. Create a new compliant route:

```sh
aws ec2 create-route --route-table-id <route_table_id> --destination-cidr-block <compliant_destination_CIDR> --vpc-peering-connection-id <peering_connection_id>
```
