# Description

Ensure that Azure Network Security Groups are not configured to allow unrestricted inbound access to the Telnet port (TCP 23). Network Security Group (NSG) rules should prohibit inbound Telnet traffic from open IP ranges such as 0.0.0.0/0 due to the protocol's inherent security weaknesses.

## Rational

Telnet is an insecure protocol that transmits data, including user credentials, in plaintext. Allowing unrestricted Telnet access exposes virtual machines to significant security risks, including unauthorized access, credential theft, and man-in-the-middle (MITM) attacks. Restricting Telnet traffic to trusted IP addresses mitigates these risks. Furthermore, organizations are strongly encouraged to replace Telnet with secure alternatives like SSH, which offer encrypted communication and robust authentication mechanisms.

## Impact

Limiting Telnet access may require updates to legacy systems or workflows. Ensure that any necessary access is maintained through secure, restricted channels to prevent service interruptions while enhancing overall security.

## Audit

This policy flags an *Azure Network Security Group* as `INCOMPLIANT` if it contains at least one **Inbound Security Rule** that meets all of the following conditions:

- `Direction` is **Inbound**.
- `Access` is **Allow**.
- `Protocol` is either **Tcp**, `*`, or `null`.
- `Source Address Prefix` is either **Internet**, `*` **0.0.0.0**, **/0**, or **Any**.
- `Destination Port` is **23**.

If the `Direction`, `Access`, `Protocol`, or `Source Address Prefix` fields do not match the criteria above, the VM is marked as `INAPPLICABLE`.

If the `Destination Port` does not match, the VM is considered `COMPLIANT`.
