# Remediation

A network security group filters traffic by security rules evaluated in priority order until the first match. By default, the AllowVnetInBound and AllowVnetOutBound rules permit all traffic identified with the VirtualNetwork service tag. A default-deny posture adds an explicit rule, evaluated after every allow rule, that denies all other traffic. Prerequisites: Identify every required inbound and outbound path, including Azure platform traffic such as load balancer health probes, and create narrowly scoped higher-priority allow rules before adding the deny rule.

After testing the required allow rules, add explicit inbound and outbound deny-all rules using unused priority numbers greater than those of the required allow rules and at or below **4096**. Apply these rules to each in-scope NSG. Follow service-specific guidance for subnets where outbound restriction is prohibited or discouraged, including Application Gateway v2 without Network Isolation and Microsoft Entra Domain Services. Test required traffic and confirm that other traffic is denied.

Automated assessment is unavailable: Effective inbound/outbound override coverage across rule priorities, augmented prefixes, and approved intra-network exceptions needs manual review.
