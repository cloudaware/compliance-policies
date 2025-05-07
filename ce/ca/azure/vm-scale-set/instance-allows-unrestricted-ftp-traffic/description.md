# Description

Ensure that Azure VM Scale Set Instances are not configured with Network Security Group (NSG) rules that allow unrestricted inbound access to FTP services on ports 20 and 21 from the public internet (e.g., source IP ranges `0.0.0.0/0` or `::/0`). FTP traffic should be tightly controlled and limited to trusted IP ranges to reduce exposure to external threats.

## Rationale

FTP (File Transfer Protocol), which operates over TCP ports 20 (data) and 21 (control), is an outdated and insecure protocol that transmits data—including credentials—in cleartext. Allowing unrestricted external access to these ports exposes systems to significant risks, including brute-force attacks, credential harvesting, unauthorized data exfiltration, and exploitation by automated bots. Restricting access to known, trusted sources reduces the attack surface and strengthens the overall security posture.

## Impact

Restricting FTP access may impact legitimate services if they rely on open access to these ports. Proper planning, validation, and testing are essential when implementing changes to avoid service disruption. Where possible, consider migrating to more secure file transfer protocols such as SFTP or FTPS, which offer encrypted communications and enhanced authentication mechanisms.

## Audit

This policy flagged an *Azure VM Scale Set Instance* as `INCOMPLIANT` if it is associated with a *Network Interface* that is connected to an *NSG* containing at least one **Inbound Security Rule** that meets all of the following conditions:

- `Direction` is **Inbound**.
- `Access` is **Allow**.
- `Protocol` is either **Tcp**, **Udp**, `*`, or `null`.
- `Source Address Prefix` is either **Internet**, `*` **0.0.0.0**, **/0**, or **Any**.
- `Destination Port` is **20** or **21**.

If the `Direction`, `Access`, `Protocol`, or `Source Address Prefix` fields do not match the criteria above, the VM is marked as `INAPPLICABLE`.

If the `Destination Port` does not match, the VM is considered `COMPLIANT`.
