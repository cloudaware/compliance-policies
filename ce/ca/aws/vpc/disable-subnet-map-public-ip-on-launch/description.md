# Description

This policy identifies AWS VPC Subnets that are configured to automatically assign **public IPv4 addresses** and/or **IPv6 addresses** to instances launched within them.

## Rationale

Public IP address assignment should be an intentional and controlled action. When subnet-level auto-assignment settings are enabled, all instances launched into the subnet (unless explicitly overridden) automatically receive externally routable IP addresses.

- **Map Public IP On Launch** assigns a public IPv4 address.
- **Assign IPv6 Address On Creation** assigns an IPv6 address from the subnet's IPv6 CIDR block.

Enabling either setting can unintentionally expose resources to external networks, increasing the attack surface and the risk of unauthorized access. These settings should be enabled only for subnets explicitly designed for internet-facing workloads.

## Audit

This policy flags an *AWS VPC Subnet* as `INCOMPLIANT` if **either** of the following conditions is met:

- `Map Public IP On Launch` is set to **true**
- `Assign IPv6 Address On Creation` is set to **true**
