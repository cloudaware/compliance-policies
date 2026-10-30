# Description

This policy identifies Default Oracle IAAS Security Lists that allow non-ICMP traffic from or to the internet.

## Rationale

A default security list is created when a VCN is created and can be attached to public subnets in the VCN. Security lists provide stateful or stateless filtering of ingress and egress network traffic to OCI resources in the VCN. Leaving internet-reachable ingress or broad internet egress in the default security list increases the risk of unauthorized access and data exfiltration. Restricting these default rules reduces baseline exposure and encourages the use of explicitly approved network controls.

ICMP is excepted because it is commonly required for network diagnostics and control-plane behavior such as reachability testing and path MTU discovery. ICMP does not provide application-layer access in the same way as TCP or UDP services, but it should still be limited to approved operational needs.

## Impact

For existing environments, before removing an ingress rule with a source of `0.0.0.0/0`, confirm that the required access is provided through another Network Security Group or Security List.

Before removing an egress rule with destination `0.0.0.0/0`, confirm that outbound connectivity is covered through another Network Security Group, Security List, or through the stateful behavior of the related ingress rule.

## Audit

This policy evaluates *Oracle IAAS Security Lists* whose `Name` starts with `Default Security List for `. OCI assigns this naming pattern to the default security list created for a VCN.

A default security list is `INCOMPLIANT` when it has at least one related security list rule where:

- `Direction` is `Ingress`, `Source` is `0.0.0.0/0`, and `Protocol` is not `ICMP`, or
- `Direction` is `Egress`, `Destination` is `0.0.0.0/0`, and `Protocol` is not `ICMP`

Security lists that are not configured as a VCN default security list are `INAPPLICABLE`. Default security lists that do not contain matching rules are `COMPLIANT`.

## References

1. <https://docs.oracle.com/en-us/iaas/Content/Network/Concepts/securitylists.htm>
2. <https://docs.oracle.com/en-us/iaas/tools/oci-cli/latest/oci_cli_docs/cmdref/network/security-list.html>
