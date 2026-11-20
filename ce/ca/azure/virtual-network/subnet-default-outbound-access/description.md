# Description

Virtual machines without an explicit outbound method reach public endpoints through default outbound access, a Microsoft-owned public IP address, unless their subnet is private. The subnet's Default outbound access setting is Enabled or Disabled (private); delegated subnets and the subnets reserved for gateways, Azure Firewall, Route Server, and Bastion are out of scope. Prerequisites: Give each virtual machine that needs public endpoints an explicit outbound method, such as a NAT gateway, before disabling default outbound access.

## Rationale

Default outbound access gives a virtual machine an internet egress path nobody configured, through a Microsoft-owned public IP address that can change without notice. A compromised workload can use that path for data exfiltration or command- and-control traffic that leaves from an address the organization does not own and passes through no egress firewall or NAT gateway it controls.

## Audit

This requirement needs manual assessment. Subnet defaultOutboundAccess and delegation evidence required for scope exclusions are not collected.
