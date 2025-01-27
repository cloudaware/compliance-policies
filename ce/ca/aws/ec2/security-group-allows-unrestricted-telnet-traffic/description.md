# Description

Verify that Telnet traffic to AWS EC2 instances is restricted. The Telnet protocol, operating on port 23, should not be open to all IP ranges (0.0.0.0/0) due to its lack of encryption and inherent security vulnerabilities.

## Rational

Telnet transmits data, including credentials, in plaintext, making it highly susceptible to interception and exploitation by malicious actors. Allowing unrestricted Telnet access exposes instances to potential unauthorized access, data compromise, and increased vulnerability to man-in-the-middle attacks. By restricting Telnet traffic to trusted sources, you mitigate these risks and improve the overall security posture of your AWS environment. It's also encouraged to adopt secure alternatives, such as SSH, which provide encrypted communication.

## Impact

Requires configuration adjustments to ensure legitimate traffic is not disrupted.

## Audit

This policy marks an EC2 Security Group as `INCOMPLIANT` if it contains a rule that meets all the following conditions:

- The `Direction` is set to **Inbound**.
- The `Source IP Range` is **0.0.0.0/0** or **::/0**.
- The `Protocol` is **All** or  **tcp**.
- The `From Port` and `To Port` fields include port **23**.

The EC2 Security Group that does not contain a rule meeting all these conditions is considered `COMPLIANT`.
