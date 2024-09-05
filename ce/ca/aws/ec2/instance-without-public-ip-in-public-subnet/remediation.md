# Remediation

## From Command Line

### Remove an Internet Gateway Route from a Route Table

Run the following command to delete a route from a route table:

```sh
aws ec2 delete-route --route-table-id {{route-table-id}}
```

Replace `{{route-table-id}}` with the actual route table ID.

### Associate a Subnet with a Route Table without an Internet Gateway Route

You can disassociate a subnet from a route table and associate it with a route table that does not have an internet gateway route. Until you associate the subnet with another route table, it will be implicitly associated with the main route table.

#### Disassociate a subnet from a route table

```sh
aws ec2 disassociate-route-table --association-id {{association-id}}
```

Replace `{{association-id}}` with the actual association ID representing the current association between the route table and subnet.

#### Associate a subnet with a route table

```sh
aws ec2 associate-route-table --route-table-id {{route-table-id}} --subnet-id {{subnet-id}}
```

Replace `{{route-table-id}}` with the actual route table ID and `{subnet-id}}` with the ID of the subnet you want to associate.
