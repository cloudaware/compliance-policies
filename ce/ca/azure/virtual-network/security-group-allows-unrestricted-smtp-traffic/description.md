# Description

Ensure that Azure Network Security Groups do not permit unrestricted inbound access to the SMTP port (TCP 25). Inbound SMTP traffic should be explicitly restricted within Network Security Groups to prevent exposure to the public internet via open IP ranges such as 0.0.0.0/0.

## Rational

Unrestricted access to SMTP (port 25) can result in the unauthorized use of your VM for sending email, often leading to abuse such as spam or malicious email relay. This behavior can cause your public IP addresses to be blacklisted, impact email deliverability, degrade your organization’s reputation, and potentially violate compliance and acceptable use policies. Limiting SMTP traffic to trusted IP ranges or internal networks ensures controlled usage and mitigates the risk of misuse.

## Impact

Restricting SMTP access may require changes to existing mail services or relay configurations. Ensure that any legitimate email functionality is maintained through approved channels to avoid disruption to business-critical communications.

## Audit

This policy flags an *Azure Network Security Group* as `INCOMPLIANT` if it contains at least one **Inbound Security Rule** that meets all of the following conditions:

- `Direction` is **Inbound**.
- `Access` is **Allow**.
- `Protocol` is either **Tcp**, `*`, or `null`.
- `Source Address Prefix` is either **Internet**, `*` **0.0.0.0**, **/0**, or **Any**.
- `Destination Port` is **25**.

If the `Direction`, `Access`, `Protocol`, or `Source Address Prefix` fields do not match the criteria above, the VM is marked as `INAPPLICABLE`.

If the `Destination Port` does not match, the VM is considered `COMPLIANT`.
