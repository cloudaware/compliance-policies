# Description

This policy identifies Google GCE Networks that have Firewall Rules allowing unrestricted incoming traffic (`0.0.0.0/0`) from the internet to ports commonly used by CiscoSecure WebSM (TCP port 9090).

In GCP, **Firewall Rules** are defined at the **VPC Network** level. Each rule either *allows* or *denies* traffic based on its configuration. These configurations specify the type of traffic (e.g., protocols and ports) and the source or destination (e.g., IP addresses, subnets, and instances).

## Rationale

Exposing management interfaces such as WebSM to the public internet creates a significant security risk. These ports should only be accessible from trusted, internal network locations. Allowing unrestricted public access makes these services vulnerable to scanning, brute-force login attempts, and exploitation of potential vulnerabilities, which could lead to unauthorized access and compromise of network devices or infrastructure.

## Impact

All external connections to WebSM from outside the affected VPC(s) can be blocked. If there is a legitimate business requirement for remote access (for example, administrative access to Cassandra resources), specific trusted source IP addresses should be explicitly defined in firewall rules to whitelist access to the required ports.

## Audit

This policy flags a *Google GCE Network* as `INCOMPLIANT` if it includes at least one *Firewall Rule* that meets all of the following conditions:

- `Source Ranges` is **0.0.0.0/0** or **::/0**
- `Direction` is **INGRESS**
- `Allowed Protocols / Ports JSON` specifies the **tcp** `protocol` and the `startPort` - `endPort` range includes **9090**.
