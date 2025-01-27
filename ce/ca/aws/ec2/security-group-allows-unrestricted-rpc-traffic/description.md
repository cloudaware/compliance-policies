# Description

Restrict inbound RPC traffic in AWS EC2 security groups to enhance network security and prevent unauthorized communication. RPC traffic, typically associated with port 135, facilitates inter-process communication between distributed systems. However, unrestricted access to this port poses significant security risks, including unauthorized access or exploitation of vulnerabilities.

## Rational

RPC traffic is commonly exploited by attackers to gain unauthorized access to systems or execute malicious actions remotely. By restricting RPC traffic in security groups, organizations can mitigate risks such as unauthorized data access, lateral movement within networks, and exploitation of protocol vulnerabilities. Unchecked RPC traffic can also facilitate the spread of malware within a network. Limiting access to trusted IP ranges reduces the overall attack surface, thereby strengthening the security of the associated EC2 instances.

## Impact

Restricting RPC traffic requires evaluating dependent applications to ensure they're functionality is not disrupted.

## Audit

This policy marks an EC2 Security Group as `INCOMPLIANT` if it contains a rule that meets all the following conditions:

- The `Direction` is set to **Inbound**.
- The `Source IP Range` is **0.0.0.0/0** or **::/0**.
- The `Protocol` is **All**,  **tcp**, or **udp**.
- The `From Port` and `To Port` fields include port **135**.

The EC2 Security Group that does not contain a rule meeting all these conditions is considered `COMPLIANT`.
