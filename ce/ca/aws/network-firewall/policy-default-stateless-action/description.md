# Description

This policy identifies AWS Network Firewall Policies where the default action for stateless traffic, meaning packets that do not match any configured stateless rules, is set to **Pass**.

## Rationale

In AWS Network Firewall, stateless rules are evaluated before stateful rules. When a packet does not match any stateless rule, the firewall applies the configured **Stateless Default Action**:

- **aws:drop**: Blocks the traffic.
- **aws:forward_to_sfe**: Forwards the traffic to the stateful engine for deeper inspection, such as signature-based detection and domain filtering.
- **aws:pass**: Allows the traffic to reach its destination without additional inspection.

Configuring the stateless default action as **Pass** introduces a security gap by allowing unmatched traffic to bypass both stateless controls and the stateful inspection engine. This may result in insufficient enforcement of network security policies.

## Impact

Malicious or unauthorized traffic may enter the network if stateless rules do not explicitly account for all unwanted traffic patterns.

## Audit

This policy flags an *AWS NetworkFirewall Firewall Policy* as `INCOMPLIANT` if its **Stateless Default Actions** or **Stateless Fragment Default Actions** include the **aws:pass** action.

*Firewall Policies* that are not in **ACTIVE** `Firewall Policy Status` are marked as `INAPPLICABLE`.
