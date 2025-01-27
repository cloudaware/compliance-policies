# Description

Audit and modify AWS EC2 Security Group rules to restrict access to MongoDB instances by blocking unrestricted inbound traffic to ports 27017 - 27020. The access should be limited to specific IP addresses or internal networks to reduce the risk of unauthorized access and potential data breaches.

## Rational

MongoDB is a NoSQL database, and exposing it to the open internet (e.g., via 0.0.0.0/0) poses a significant security risk. Unrestricted access can lead to data exfiltration, unauthorized changes, and other malicious activities. Restricting access to MongoDB to trusted IP ranges or systems ensures that only authorized users or applications can interact with the database, mitigating the risk of security breaches and reduces the attack surface.

## Impact

Requires careful implementation to ensure legitimate users and systems maintain access.

## Audit

This policy marks an EC2 Security Group as `INCOMPLIANT` if it contains a rule that meets all the following conditions:

- The `Direction` is set to **Inbound**.
- The `Source IP Range` is **0.0.0.0/0** or **::/0**.
- The `Protocol` is **All** or  **tcp**.
- The `From Port` and `To Port` fields include ports **27017**, **27018**, **27019**, **27020**.

The EC2 Security Group that does not contain a rule meeting all these conditions is considered `COMPLIANT`.
