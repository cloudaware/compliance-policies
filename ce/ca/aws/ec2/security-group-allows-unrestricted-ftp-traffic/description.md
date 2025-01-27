# Description

Review and update AWS EC2 Security Group rules to restrict FTP traffic (ports 20 and 21) to specific trusted IP ranges or disable it entirely. The unrestricted FTP traffic can lead to unauthorized access, exposing sensitive systems and data to potential threats. Security Groups are critical network access control tools within AWS EC2, and maintaining least-privilege configurations ensures the security and integrity of your cloud environment.

## Rational

FTP, which uses ports 20 (data transfer) and 21 (command control), is an inherently insecure protocol that transmits data, including credentials, in plaintext. Allowing unrestricted access to these ports increases the risk of unauthorized access, data breaches, and exploitation by malicious actors. If unrestricted FTP access remains, systems may become vulnerable to brute-force attacks, data theft, and other malicious activities.

## Impact

Implementing restrictions may disrupt legitimate traffic if not planned carefully, emphasizing the need for precise configuration and testing.

## Audit

This policy marks an EC2 Security Group as `INCOMPLIANT` if it contains a rule that meets all the following conditions:

- The `Direction` is set to **Inbound**.
- The `Source IP Range` is **0.0.0.0/0** or **::/0**.
- The `Protocol` is **All** or **tcp**.
- The `From Port` and `To Port` fields include port **20** or **21**.

The EC2 Security Group that does not contain a rule meeting all these conditions is considered `COMPLIANT`.
