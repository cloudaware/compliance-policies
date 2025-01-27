# Description

Audit and modify the AWS EC2 Security Group configurations to prevent unrestricted inbound access to PostgreSQL on port 5432. Security Groups should be configured to allow inbound access only from trusted IP addresses or internal networks, minimizing exposure to threats and ensuring database integrity.

## Rational

Allowing unrestricted access to PostgreSQL on port 5432 significantly increases the risk of malicious actors exploiting vulnerabilities, brute-force attacks, and unauthorized data access. PostgreSQL is a widely used relational database management system, and exposing it to the public internet can result in sensitive data being compromised. By restricting access to trusted sources, you limit the attack surface, ensuring the database remains secure and that only authorized users or systems can interact with it.

## Impact

Requires careful implementation to avoid disrupting legitimate connections or business processes that require access to the database.

## Audit

This policy marks an EC2 Security Group as `INCOMPLIANT` if it contains a rule that meets all the following conditions:

- The `Direction` is set to **Inbound**.
- The `Source IP Range` is **0.0.0.0/0** or **::/0**.
- The `Protocol` is **All** or  **tcp**.
- The `From Port` and `To Port` fields include port **5432**.

The EC2 Security Group that does not contain a rule meeting all these conditions is considered `COMPLIANT`.
