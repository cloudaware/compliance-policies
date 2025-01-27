# Description

Ensure that ICMP traffic (used for network diagnostics such as ping) is appropriately restricted in AWS EC2 Security Groups. Allowing unrestricted ICMP access can expose the EC2 instances to network reconnaissance or Denial of Service (DoS) attacks. Restricting ICMP access is essential for maintaining a secure environment by limiting unnecessary traffic and potential attack vectors.

## Rational

ICMP is commonly used for network diagnostics but can also be exploited by malicious actors for reconnaissance purposes, such as identifying active hosts or determining the topology of your network. By allowing unrestricted ICMP access, attackers could send large numbers of requests (ping floods) that overwhelm systems or network devices, leading to a Denial of Service (DoS) attack. Restricting ICMP helps secure the infrastructure by minimizing exposure to such attacks while ensuring that legitimate diagnostic traffic remains functional.

## Impact

You might impact network diagnostics or monitoring tools that rely on ICMP, requiring careful configuration of access.

## Audit

This policy marks an EC2 Security Group as `INCOMPLIANT` if it contains a rule that meets all the following conditions:

- The `Direction` is set to **Inbound**.
- The `Source IP Range` is **0.0.0.0/0** or **::/0**.
- The `Protocol` is **icmp**.

The EC2 Security Group that does not contain a rule meeting all these conditions is considered `COMPLIANT`.
