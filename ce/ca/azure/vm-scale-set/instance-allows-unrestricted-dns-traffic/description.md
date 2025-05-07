# Description

Verify that Azure VM Scale Set Instances are not associated with Network Security Group rules that allow unrestricted inbound access to DNS services on port 53. NSG rules should be configured to restrict inbound DNS traffic to specific, trusted IP address ranges such as internal subnets or authorized DNS resolvers. This reduces the risk of exposure to threats including DNS amplification, tunneling, and command-and-control communication.

## Rationale

Unrestricted DNS access from the public internet can lead to a range of security issues. Malicious actors may exploit open DNS services to launch amplification attacks or tunnel data covertly. Restricting DNS traffic to known and trusted sources ensures that only authorized systems can initiate DNS queries or responses, thereby minimizing the attack surface and enhancing the security posture of the environment.

## Impact

Enforcing restrictions on DNS traffic may require reconfiguration of applications or services that rely on open access to external DNS servers. Failure to account for legitimate dependencies could result in service disruptions. As part of remediation, it is critical to validate DNS resolution paths and ensure all required DNS servers are explicitly permitted.

## Audit

This policy flagged an *Azure VM Scale Set Instance* as `INCOMPLIANT` if it is associated with a *Network Interface* that is connected to an *NSG* containing at least one **Inbound Security Rule** that meets all of the following conditions:

- `Direction` is **Inbound**.
- `Access` is **Allow**.
- `Protocol` is either **Tcp**, **Udp**, `*`, or `null`.
- `Source Address Prefix` is either **Internet**, `*` **0.0.0.0**, **/0**, or **Any**.
- `Destination Port` is **53**.

If the `Direction`, `Access`, `Protocol`, or `Source Address Prefix` fields do not match the criteria above, the VM is marked as `INAPPLICABLE`.

If the `Destination Port` does not match, the VM is considered `COMPLIANT`.
