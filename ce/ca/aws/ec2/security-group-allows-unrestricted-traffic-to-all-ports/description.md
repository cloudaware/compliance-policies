# Description

Audit and restrict AWS EC2 Security Group configurations to prevent unrestricted traffic across all ports. Security Groups allowing inbound traffic to all ports (0-65535) from unrestricted IP ranges (e.g., 0.0.0.0/0) pose a critical security risk and should be modified to permit access only to specific ports and trusted IP ranges as per application requirements.

## Rational

Allowing unrestricted traffic to all ports exposes instances to a broad range of potential threats, including unauthorized access, malware attacks, data exfiltration,, and exploitation of known and unknown vulnerabilities. Such configurations significantly increase the attack surface of your infrastructure, making it easier for malicious actors to compromise systems. Restricting access to specific ports and trusted IP ranges minimizes the exposure, and reduces the risk of data breaches and unauthorized activities.

## Impact

Requires careful planning to avoid disrupting legitimate traffic or business operations.

## Audit

This policy marks an EC2 Security Group as `INCOMPLIANT` if it contains a rule that meets all the following conditions:

- The `Direction` is set to **Inbound**.
- The `Source IP Range` is **0.0.0.0/0** or **::/0**.
- The `Protocol` is **All** or  **tcp**.
- The `From Port` and `To Port` fields are either **0** and **65535** or empty.

The EC2 Security Group that does not contain a rule meeting all these conditions is considered `COMPLIANT`.
