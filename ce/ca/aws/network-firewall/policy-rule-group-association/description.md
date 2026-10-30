# Description

This policy identifies AWS Network Firewall Policies that are not associated with at least one stateless or stateful rule group.

## Rationale

An AWS Network Firewall policy serves as a container for stateless and stateful rule groups. While the policy defines default actions, such as how traffic is handled when no rules match, the actual inspection, filtering, and enforcement logic is implemented within the rule groups themselves. A firewall policy without any associated rule groups provides minimal security value and may indicate an incomplete or misconfigured firewall setup, potentially allowing network traffic to pass without proper inspection or control.

## Audit

This policy flags an *AWS NetworkFirewall Firewall Policy* as `INCOMPLIANT` if it is not associated with at least one *AWS Network Firewall Rule Group*.

*Firewall Policies* that are not in **ACTIVE** `Firewall Policy Status` are marked as `INAPPLICABLE`.
