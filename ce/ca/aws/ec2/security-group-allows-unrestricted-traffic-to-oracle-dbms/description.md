# Description

Audit and modify AWS EC2 Security Groups to restrict inbound access to Oracle DBMS instances. Oracle DBMS typically runs on ports 1521, 1830, 2483 and 2484, and unrestricted access to these ports increases the risk of unauthorized access. Security Groups should be configured to allow traffic only from trusted IP addresses or internal systems to minimize exposure and safeguard sensitive data.

## Rational

Allowing unrestricted access to Oracle DBMS increases the risk of unauthorized access, brute-force attacks, data theft, and exploitation of any vulnerabilities within Oracle. These databases are high-value targets for attackers, and exposing them to the public internet without proper controls can result in severe security incidents. By restricting access to trusted networks or IP ranges, you reduce the attack surface and improve the security posture of the Oracle database, helping to prevent unauthorized data access or modification.

## Impact

Requires careful implementation to avoid disrupting legitimate connections or business processes that require access to the database.

## Audit

This policy marks an EC2 Security Group as `INCOMPLIANT` if it contains a rule that meets all the following conditions:

- The `Direction` is set to **Inbound**.
- The `Source IP Range` is **0.0.0.0/0** or **::/0**.
- The `Protocol` is **All** or  **tcp**.
- The `From Port` and `To Port` fields include ports **1521**, **1830**, **2483**, **2484**.

The EC2 Security Group that does not contain a rule meeting all these conditions is considered `COMPLIANT`.
