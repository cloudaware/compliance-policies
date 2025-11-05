# Description

This policy identifies Google GCE Networks that lack at least one egress firewall rule configured to explicitly deny outbound traffic.

## Rationale

Implementing a default-deny posture for egress traffic is a fundamental security best practice. By default, VPC networks permit all outbound traffic. Creating a low-priority firewall rule that denies all egress traffic ensures that network administrators must deliberately define higher-priority rules to allow only necessary outbound connections. This approach helps prevent data exfiltration, restricts compromised instances from communicating with external servers, and enforces the principle of least privilege for network traffic.

## Impact

Enforcing this policy may disrupt legitimate outbound traffic that currently relies on unrestricted firewall rules.

## Audit

This policy flags a *Google GCE Network* as `INCOMPLIANT` if it does not have at least one associated *Google GCE Firewall Rule* that meets the following criteria:

- `Direction`: **EGRESS**  
- `Destination Ranges`: **0.0.0.0/0**  
- `Denied Protocols / Ports`: The rule must deny all traffic. This includes any `protocol` labeled as **all** or any entry where both `startPort` and `endPort` are **null**.
