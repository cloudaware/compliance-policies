# Description

Ensure that Azure VM Scale Set Instances are not associated with Network Interfaces that are linked to Network Security Groups containing inbound rules that allow unrestricted access (e.g., `0.0.0.0/0` or `::/0`) across all ports. Instead, restrict access to only those IP addresses that require it, in accordance with the principle of least privilege.

## Rationale

Permitting unrestricted inbound access from the public internet significantly increases the exposure of your environment to potential threats. Such configurations allow attackers to scan all open ports for vulnerabilities, potentially leading to unauthorized access, data exfiltration, or service disruption. Implementing tightly scoped rules based on required IP addresses and necessary ports aligns with the principle of least privilege and strengthens your security posture.

A compromise resulting from overly permissive rules could lead to data breaches, service outages, or exploitation of your infrastructure for launching further attacks.

## Audit

This policy flagged an *Azure VM Scale Set Instance* as `INCOMPLIANT` if it is associated with a *Network Interface* that is connected to an *NSG* containing at least one **Inbound Security Rule** that meets all of the following conditions:

- `Direction` is **Inbound**.
- `Access` is **Allow**.
- `Protocol` is either **Tcp**, `*`, or `null`.
- `Source Address Prefix` is either **Internet**, `*` **0.0.0.0**, **/0**, or **Any**.
- `Destination Port` is either `-1`, `*`, or **0-65535**.

If the `Direction`, `Access`, `Protocol`, or `Source Address Prefix` fields do not match the criteria above, the VM is marked as `INAPPLICABLE`.

If the `Destination Port` does not match, the VM is considered `COMPLIANT`.
