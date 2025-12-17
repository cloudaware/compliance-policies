# Description

This policy identifies Azure Network Subnets that do not have any associated network security groups.
Protect subnet resources by ensuring subnets are associated with NSGs, which can filter inbound and outbound traffic using security rules.

## Rationale

Unprotected subnets can expose resources to unauthorized access.

## Impact

Minor administrative effort is required to ensure subnets are associated with network security groups. There is no cost to create or use network security groups.

## Audit

This policy flags an *Azure Network Subnet* as `INCOMPLIANT` if it has no associated `Network Security Group`.

## Default Value

By default, a subnet is not associated with a network security group.

## References

1. <https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview>
2. <https://learn.microsoft.com/en-us/cli/azure/network/vnet>
