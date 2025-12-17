# Description

Ensure that Azure Network Security Groups are not configured to allow unrestricted inbound access to the CIFS (Common Internet File System) service on TCP port 445. CIFS is a network file-sharing protocol used primarily by Windows-based systems for accessing and sharing files over a network. While essential in certain scenarios, exposing TCP port 445 to the public internet poses a significant security risk. Access to CIFS should be strictly limited to trusted IP addresses and networks to mitigate the risk of unauthorized access and data compromise.

## Rationale

Unrestricted access to CIFS over TCP port 445 significantly increases the attack surface of your environment. Threat actors commonly target this port to exploit vulnerabilities in file-sharing protocols, potentially resulting in unauthorized access, data leakage, or lateral movement within the network. Restricting CIFS access to only trusted networks and enforcing appropriate network security controls aligns with the principle of least privilege and is a critical step toward safeguarding sensitive resources.

## Impact

Implementing restrictions on CIFS traffic may require adjustments to network configurations, firewall rules, and access control policies. While this may introduce some operational overhead, the resulting reduction in exposure to external threats and prevention of unauthorized data access provides substantial security benefits that far outweigh the implementation effort.

## Audit

This policy flags an *Azure Network Security Group* as `INCOMPLIANT` if it contains at least one **Inbound Security Rule** that meets all of the following conditions:

- `Direction` is **Inbound**.
- `Access` is **Allow**.
- `Protocol` is either **Tcp**, **Udp**, `*`, or `null`.
- `Source Address Prefix` is either **Internet**, `*` **0.0.0.0**, **/0**, or **Any**.
- `Destination Port` is **445**.

If the `Direction`, `Access`, `Protocol`, or `Source Address Prefix` fields do not match the criteria above, the VM is marked as `INAPPLICABLE`.

If the `Destination Port` does not match, the VM is considered `COMPLIANT`.
