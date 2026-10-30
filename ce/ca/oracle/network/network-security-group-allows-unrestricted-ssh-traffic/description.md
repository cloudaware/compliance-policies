# Description

This policy identifies Oracle IAAS Network Security Groups that allow unrestricted ingress from the internet to the Secure Shell (SSH) port, `TCP/22`.

## Rationale

SSH is commonly used to administer Linux workloads and other networked systems. Allowing SSH access from `0.0.0.0/0` or `::/0` exposes administrative interfaces to internet-wide scanning, brute-force attempts, credential stuffing, and exploitation of vulnerable SSH services. Network security group rules should allow SSH only from trusted administrative networks, bastion hosts, VPN ranges, or other controlled access paths.

## Impact

Restricting public SSH ingress can block administrative connections that currently depend on open internet access. Confirm that administrators have an approved access path before removing or narrowing existing rules.

## Audit

This policy flags an *Oracle IAAS Network Security Group* as `INCOMPLIANT` when it has at least one related rule that meets all of the following conditions:

- `Direction` is **INGRESS**.
- `Source` is **0.0.0.0/0** or **::/0**.
- `Protocol` is **ALL**, or `Protocol` is **TCP** and either the destination port range includes **22** or no destination port range is set.

Network security groups without matching ingress rules are `COMPLIANT`.

## References

1. <https://docs.oracle.com/iaas/Content/Network/Concepts/manage-nsg-security-rules.htm>
2. <https://docs.oracle.com/iaas/tools/oci-cli/latest/oci_cli_docs/cmdref/network/nsg.html>
