# Description

This policy checks whether an AWS VPC Subnet is configured to automatically assign public IPv4 addresses to instances launched within it.

## Rationale

Public IP assignment should be an intentional and controlled action. When the auto-assign public IP setting is enabled at the subnet level, all instances launched into the subnet (unless explicitly overridden) automatically receive a public IP address. This can inadvertently expose resources to the internet and increase the attack surface.

## Audit

This policy flags an *AWS VPC Subnet* as `INCOMPLIANT` if `Map Public IP On Launch` checkbox is set to **true**.
