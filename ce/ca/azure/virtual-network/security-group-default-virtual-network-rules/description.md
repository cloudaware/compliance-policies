# Description

A network security group filters traffic by security rules evaluated in priority order until the first match. By default, the AllowVnetInBound and AllowVnetOutBound rules permit all traffic identified with the VirtualNetwork service tag. A default-deny posture adds an explicit rule, evaluated after every allow rule, that denies all other traffic. Prerequisites: Identify every required inbound and outbound path, including Azure platform traffic such as load balancer health probes, and create narrowly scoped higher-priority allow rules before adding the deny rule.

## Rationale

The VirtualNetwork service tag spans more than the local subnet: Microsoft includes peered virtual networks, on-premises ranges reached over VPN or ExpressRoute, and gateway-connected networks. The default rules also permit unrestricted outbound access to the internet. Relying on them grants lateral reachability across that trust boundary and an open egress path a compromised workload can use for exfiltration or command-and-control.

## Audit

This requirement needs manual assessment. Effective inbound/outbound override coverage across rule priorities, augmented prefixes, and approved intra-network exceptions needs manual review.
