# Description

This policy identifies AWS Network Firewalls that do not have **Subnet Change Protection** enabled.

## Rationale

AWS Network Firewall deploys endpoints in specific subnets to inspect network traffic. If these subnets are modified or removed without proper coordination, the firewall may become unreachable, or VPC traffic routing may fail, resulting in service disruption or downtime.

Enabling **Subnet Change Protection** acts as a safeguard by preventing unintended modifications to the firewall’s subnet associations. Changes to the firewall’s network configuration require that the protection be explicitly disabled, ensuring that subnet updates are intentional and controlled.

## Audit

This policy flags an *AWS NetworkFirewall Firewall* as `INCOMPLIANT` if the **Subnet Change Protection** field is set to **false**.

*Firewalls* that are not in **READY** `Status` are marked as `INAPPLICABLE`.
