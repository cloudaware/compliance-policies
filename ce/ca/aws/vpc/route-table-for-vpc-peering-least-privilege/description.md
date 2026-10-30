# Description

Once a VPC peering connection is established, routing tables must be updated to enable connectivity between the peered VPCs. These routes can be as specific as needed, even peering a VPC to a single host on the other side of the connection.

## Rationale

Being highly selective in peering route tables is an effective way to minimize the impact of a breach because resources outside these routes are inaccessible to the peered VPC.

## Audit

Review route tables of peered VPCs to determine whether they route all subnets of each VPC and whether that is necessary for the intended purpose of peering.

### From Command Line

1. List all the route tables from a VPC and check if `GatewayId` is pointing to a `<peering_connection_id>` (e.g. pcx-1a2b3c4d) and if `DestinationCidrBlock` is as specific as desired:

```sh
aws ec2 describe-route-tables --filter "Name=vpc-id,Values=<vpc_id>" --query "RouteTables[*].{RouteTableId:RouteTableId, VpcId:VpcId, Routes:Routes, AssociatedSubnets:Associations[*].SubnetId}"
```

## References

1. <https://docs.aws.amazon.com/AmazonVPC/latest/PeeringGuide/peering-configurations-partial-access.html>
2. <https://docs.aws.amazon.com/cli/latest/reference/ec2/create-vpc-peering-connection.html>

## Additional Information

If an organization uses AWS Transit Gateway in its VPC architecture, apply the same least-access routing principles at the transit gateway level in addition to the VPC route table. To route traffic between two or more VPCs via a transit gateway, VPCs must have an attachment to a transit gateway route table and a route. To avoid unintended routing, add route table attachments only when there is an explicit need to route traffic between VPCs. Because transit gateways can host multiple route tables, you can group VPCs by attaching them to a common route table.
