# Description

Review and modify AWS EC2 Security Group settings to prevent unrestricted access to MySQL instances on port 3306. Security Groups should be configured to allow inbound traffic to MySQL only from trusted IP addresses or internal systems to minimize exposure to external threats and unauthorized access.

## Rational

Allowing unrestricted access to MySQL on port 3306 increases the risk of unauthorized access, brute-force attacks, data exfiltration, and potential SQL injection vulnerabilities. Exposing MySQL to the internet without proper access control is a common attack vector, and attackers may attempt to exploit weak passwords or vulnerabilities in MySQL itself. Restricting access to trusted networks ensures that only authorized users and systems can interact with the MySQL, helping protect sensitive data.

## Impact

Requires configuring the Security Group to maintain legitimate database access for authorized users and applications.

## Audit

This policy marks an EC2 Security Group as `INCOMPLIANT` if it contains a rule that meets all the following conditions:

- The `Direction` is set to **Inbound**.
- The `Source IP Range` is **0.0.0.0/0** or **::/0**.
- The `Protocol` is **All** or  **tcp**.
- The `From Port` and `To Port` fields include port **3306**.

The EC2 Security Group that does not contain a rule meeting all these conditions is considered `COMPLIANT`.
