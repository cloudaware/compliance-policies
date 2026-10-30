# Description

This policy identifies AWS Network Firewalls that do not have **Delete Protection** enabled.

## Rationale

AWS Network Firewall often serves as a critical control point for network traffic entering or leaving a VPC. Accidental deletion of a firewall can result in significant operational and security risks, including:

1. **Traffic Disruption:** If routing configurations continue to reference firewall endpoints that no longer exist, network traffic may be disrupted or fail entirely.
2. **Security Gaps:** If the firewall is removed and traffic is allowed to bypass inspection due to routing behavior, network traffic may flow without enforcement, increasing exposure to malicious or unauthorized activity.

Enabling **Delete Protection** introduces an additional safeguard by requiring explicit action to disable the protection before a firewall can be deleted, reducing the risk of accidental or unauthorized removal.

## Audit

This policy flags an *AWS NetworkFirewall Firewall* as `INCOMPLIANT` if the **Delete Protection** field is set to **false**.

*Firewalls* that are not in **READY** `Status` are marked as `INAPPLICABLE`.
