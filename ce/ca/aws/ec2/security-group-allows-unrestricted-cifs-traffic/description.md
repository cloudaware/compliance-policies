# Description

Common Internet File System (CIFS) is a network file-sharing protocol that allows
systems to share files over a network. However, unrestricted CIFS access can expose
your data to unauthorized users, leading to potential security risks. It is important to
restrict CIFS access to only trusted networks and users to prevent unauthorized access
and data breaches.

## Rationale

Allowing unrestricted CIFS access can lead to significant security vulnerabilities, as it
may allow unauthorized users to access sensitive files and data. By restricting CIFS
access to known and trusted networks, you can minimize the risk of unauthorized
access and protect sensitive data from exposure to potential attackers. Implementing
proper network access controls and permissions is essential for maintaining the security
and integrity of your file-sharing systems.

## Impact

Restricting CIFS access may require additional configuration and management effort.
However, the benefits of enhanced security and reduced risk of unauthorized access to
sensitive data far outweigh the potential challenges.

## Audit

This policy marks an EC2 Security Group as `INCOMPLIANT` if it contains a rule that meets all the following conditions:

- The `Direction` is set to **Inbound**.
- The `Source IP Range` is **0.0.0.0/0** or **::/0**.
- The `Protocol` is **All**, **tcp**, or **udp**.
- The `From Port` and `To Port` fields include port **445**.

The EC2 Security Group that does not contain a rule meeting all these conditions is considered `COMPLIANT`.
