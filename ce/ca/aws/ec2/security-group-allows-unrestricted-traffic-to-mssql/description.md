# Description

Review and restrict AWS EC2 Security Groups to ensure that inbound traffic to Microsoft SQL Server (port 1433) is limited to authorized IP addresses or trusted networks. Security Groups should be configured to restrict access to MSSQL instances to trusted IP addresses or internal networks, minimizing the risk of unauthorized access and potential exploitation.

## Rational

Unrestricted access to MSSQL can expose the database to various threats, including brute-force attacks, unauthorized data access, and data theft. MSSQL servers are frequently targeted by attackers due to weak authentication or vulnerabilities in outdated versions. By limiting access to only trusted sources, you reduce the attack surface and ensure that the database is protected from external threats.

## Impact

Requires configuring the Security Group to maintain legitimate database access for authorized users and applications.

## Audit

This policy marks an EC2 Security Group as `INCOMPLIANT` if it contains a rule that meets all the following conditions:

- The `Direction` is set to **Inbound**.
- The `Source IP Range` is **0.0.0.0/0** or **::/0**.
- The `Protocol` is **All** or  **tcp**.
- The `From Port` and `To Port` fields include port **1433**.

The EC2 Security Group that does not contain a rule meeting all these conditions is considered `COMPLIANT`.
