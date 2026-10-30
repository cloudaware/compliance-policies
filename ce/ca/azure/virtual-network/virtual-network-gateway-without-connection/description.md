# Description

Ensure that an Azure Virtual Network Gateway has at least one connection. Delete unnecessary gateways that do not have any connections. A gateway provisioned but not connected represents wasted cost.

An Azure Virtual Network Gateway should have at least one active connection. VPN Gateways without any established connections should be decommissioned to eliminate avoidable costs.

## Rationale

Azure Virtual Network Gateways incur charges regardless of whether they are actively used. Gateways without configured connections often indicate misconfigurations or abandoned infrastructure. Identifying and removing these resources helps optimize network architecture, reduce unnecessary expenditure, and improve operational hygiene.

## Audit

This policy marks an *Azure Virtual Network Gateway* as `INCOMPLIANT` if it has no related *Azure Virtual Network Gateway Connects*, indicating that it is not currently participating in any site-to-site, point-to-site, or VNet-to-VNet VPN configurations.
