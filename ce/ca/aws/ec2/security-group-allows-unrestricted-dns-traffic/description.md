# Description

AWS EC2 Security Groups should not allow unrestricted DNS traffic to avoid exposure to security vulnerabilities. Security group rules should be configured to limit DNS traffic (UDP port 53) to trusted IP ranges, such as internal networks or approved DNS servers, reducing the risk of misuse or attacks such as DNS amplification.

## Rationale

Restricting DNS traffic prevents unauthorized use of EC2 instances for malicious activities, such as DNS tunneling or participating in amplification attacks. By limiting DNS access to trusted sources, you ensure only authorized clients and servers can interact, reducing the surface area for potential exploits.

## Impact

Implementing restrictions might cause service interruptions if legitimate applications are not properly configured to use allowed DNS servers, making it essential to validate and update configurations thoroughly during remediation.

## Audit

This policy marks an EC2 Security Group as `INCOMPLIANT` if it contains a rule that meets all the following conditions:

- The `Direction` is set to **Inbound**.
- The `Source IP Range` is **0.0.0.0/0** or **::/0**.
- The `Protocol` is **All**, **tcp**, or **udp**.
- The `From Port` and `To Port` fields include port **53**.

The EC2 Security Group that does not contain a rule meeting all these conditions is considered `COMPLIANT`.
