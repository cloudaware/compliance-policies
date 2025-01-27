# Description

It is recommended to evaluate and restrict the configuration of AWS EC2 security groups to prevent unrestricted NetBIOS traffic (TCP: 137, 139, UDP: 137, 138). NetBIOS is often used in legacy systems for file sharing and network management in Windows environments, but exposing these ports publicly can pose significant security risks.

## Rational

Restricting NetBIOS traffic in security groups reduces the attack surface of your EC2 instances, enhancing the overall security posture. NetBIOS is known to be vulnerable to exploitation and is rarely required in modern cloud-based applications. Addressing this configuration minimizes the risk of unauthorized access, data exfiltration, and the spread of malicious payloads.

## Impact

Restrictions could also disrupt legitimate operations for systems relying on NetBIOS for communication. Therefore, should be carefully implemented, ensuring that it does not interfere with necessary business functions.

## Audit

This policy marks an EC2 Security Group as `INCOMPLIANT` if it contains a rule that meets all the following conditions:

- The `Direction` is set to **Inbound**.
- The `Source IP Range` is **0.0.0.0/0** or **::/0**.
- The `Protocol` is **All**,  **tcp**, or **udp**.
- The `From Port` or `To Port` fields take into consideration the following port-protocol combinations:
  - **TCP** `Protocol` - Ports **137** or **139**
  - **UDP** `Protocol` - Ports **137** or **138**

The EC2 Security Group that does not contain a rule meeting all these conditions is considered `COMPLIANT`.
