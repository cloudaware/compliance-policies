# Description

Ensure that Azure Network Security Groups are not configured to allow unrestricted inbound access to the Remote Desktop Protocol (RDP) port (TCP 3389). RDP is commonly used for remote management and administrative access to Windows systems. Exposing RDP directly to the public internet creates a significant security risk, as it is a frequent target of brute-force attacks and exploitation attempts.

## Rationale

Restricting RDP access through NSGs substantially reduces the attack surface of Azure Network Security Groups and enhances overall security posture. Public exposure of RDP enables threat actors to attempt unauthorized logins, exploit vulnerabilities, or launch ransomware attacks. Best practices recommend allowing RDP access only through secure methods such as VPNs, jump servers, or Azure Bastion, rather than opening the port directly to the internet.

## Impact

Implementing these restrictions may affect remote administration workflows that currently rely on direct RDP access over the internet. You should plan and implement alternative secure access methods to maintain operational continuity while eliminating unnecessary risk exposure.

## Audit

This policy flagged an *Azure Network Security Group* as `INCOMPLIANT` if it contains at least one **Inbound Security Rule** that meets all of the following conditions:

- `Direction` is **Inbound**.
- `Access` is **Allow**.
- `Protocol` is either **Tcp**, **Udp**, `*`, or `null`.
- `Source Address Prefix` is either **Internet**, `*` **0.0.0.0**, **/0**, or **Any**.
- `Destination Port` is **3389**.

If the `Direction`, `Access`, `Protocol`, or `Source Address Prefix` fields do not match the criteria above, the VM is marked as `INAPPLICABLE`.

If the `Destination Port` does not match, the VM is considered `COMPLIANT`.
