# Description

Ensure that Azure Virtual Machines are not configured to allow unrestricted inbound access to the PostgreSQL port (5432) from the public internet. Network Security Group configurations should be audited and adjusted to restrict access to this port, permitting inbound traffic only from trusted IP addresses or internal networks.

## Rational

Allowing unrestricted access to PostgreSQL on port 5432 increases the vulnerability of the database to a variety of security threats, including exploitation of known vulnerabilities, brute-force attacks, and unauthorized access to sensitive data. As a widely used relational database management system, PostgreSQL is a prime target for attackers. Exposing this service to the public internet without proper access controls can lead to the compromise of critical business data. By restricting access to trusted IP addresses or internal networks, the attack surface is minimized, ensuring that only authorized users and systems can interact with the database.

## Impact

Implementing these restrictions requires careful planning to avoid disrupting legitimate business operations or connections that rely on database access. Adequate testing should be conducted to ensure continued access for authorized entities while preserving database security.

## Audit

This policy flags an *Azure Virtual Machine* as `INCOMPLIANT` if it is associated with a *Network Interface* that is connected to an *NSG* containing at least one **Inbound Security Rule** that meets all of the following conditions:

- `Direction` is **Inbound**.
- `Access` is **Allow**.
- `Protocol` is either **Tcp**, `*`, or `null`.
- `Source Address Prefix` is either **Internet**, `*` **0.0.0.0**, **/0**, or **Any**.
- `Destination Port` is **5432**.

If the `Direction`, `Access`, `Protocol`, or `Source Address Prefix` fields do not match the criteria above, the VM is marked as `INAPPLICABLE`.

If the `Destination Port` does not match, the VM is considered `COMPLIANT`.
