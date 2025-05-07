# Description

Ensure that Azure Network Security Groups hosting Oracle DBMS instances are not configured to allow unrestricted inbound traffic to Oracle DBMS ports (1521, 1830, 2483, 2484). Network Security Group rules should be audited and modified to restrict inbound access to these ports, allowing traffic only from trusted IP addresses or internal systems to minimize exposure and secure sensitive data.

## Rational

Unrestricted access to Oracle DBMS ports significantly increases the risk of unauthorized access, brute-force attacks, data theft, and exploitation of known or unknown vulnerabilities within the Oracle database. As high-value assets, Oracle DBMS instances are frequently targeted by malicious actors seeking to exploit weaknesses. Exposing these instances to the public internet without appropriate access controls can lead to severe security breaches. By restricting access to trusted networks or IP address ranges, the attack surface is minimized, thereby enhancing the security posture of the Oracle DBMS and safeguarding sensitive data from unauthorized access or modification.

## Impact

Implementing access restrictions requires careful planning and configuration to avoid disrupting legitimate business processes or applications that require access to the Oracle DBMS. Proper testing should be conducted to ensure the database remains accessible to authorized users and systems while maintaining security.

## Audit

This policy flagged an *Azure Network Security Group* as `INCOMPLIANT` if it contains at least one **Inbound Security Rule** that meets all of the following conditions:

- `Direction` is **Inbound**.
- `Access` is **Allow**.
- `Protocol` is either **Tcp**, `*`, or `null`.
- `Source Address Prefix` is either **Internet**, `*` **0.0.0.0**, **/0**, or **Any**.
- `Destination Port` is **1521**, **1830**, **2483**, or **2484**.

If the `Direction`, `Access`, `Protocol`, or `Source Address Prefix` fields do not match the criteria above, the VM is marked as `INAPPLICABLE`.

If the `Destination Port` does not match, the VM is considered `COMPLIANT`.
