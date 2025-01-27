# Description

Verify and restrict inbound Simple Mail Transfer Protocol (SMTP) traffic to AWS EC2 instances by configuring Security Groups appropriately. SMTP traffic, commonly operating on ports 25 should not be allowed from unrestricted IP ranges (0.0.0.0/0) to prevent unauthorized use of the server for email relay or other malicious activities.

## Rational

Allowing unrestricted SMTP traffic can lead to unauthorized use of your instance for email relay, making it a target for spammers and significantly increasing the risk of your IP addresses being blacklisted. This misuse can affect your reputation, disrupt legitimate communications, and violate compliance policies. By restricting SMTP access to trusted IP ranges or internal systems, you reduce these risks and maintain control over mail server usage.

## Impact

Requires proper configuration to ensure legitimate email communication is not inadvertently disrupted.

## Audit

This policy marks an EC2 Security Group as `INCOMPLIANT` if it contains a rule that meets all the following conditions:

- The `Direction` is set to **Inbound**.
- The `Source IP Range` is **0.0.0.0/0** or **::/0**.
- The `Protocol` is **All** or  **tcp**.
- The `From Port` and `To Port` fields include port **25**.

The EC2 Security Group that does not contain a rule meeting all these conditions is considered `COMPLIANT`.
