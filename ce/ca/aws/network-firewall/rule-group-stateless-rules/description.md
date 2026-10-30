# Description

This policy identifies AWS Network Firewall **Stateless** Rule Groups that are empty and contain no defined rules.

## Rationale

AWS Network Firewall stateless rule groups are designed to filter based on source IP, source port, destination IP, destination port, and protocol. When a stateless rule group is associated with a firewall policy but contains no rules, it provides no effective security control. Empty rule groups may create a false sense of protection and unnecessarily complicate firewall configurations, making them more difficult to manage, audit, and maintain.

## Audit

This policy flags an *AWS NetworkFirewall Rule Group* with a **STATELESS** `Type` as `INCOMPLIANT` if its `Stateless Rules` list is **empty**.

**STATEFUL** *Rule Groups* and *Rule Groups* that are not in **ACTIVE** `Rule Group Status` are marked as `INAPPLICABLE`.
