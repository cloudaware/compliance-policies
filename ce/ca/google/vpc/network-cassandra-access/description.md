# Description

This policy identifies Google GCE Networks that have Firewall Rules allowing unrestricted incoming traffic (`0.0.0.0/0`) from the internet to a VPC or VM instance running Cassandra on the following ports: `7000, 7001`, `7199`, `8888`, `9042`, `9160`, `61620`, and `61621`.

In GCP, **Firewall Rules** are defined at the **VPC Network** level. Each rule either *allows* or *denies* traffic based on its configuration. These configurations specify the type of traffic (e.g., protocols and ports) and the source or destination (e.g., IP addresses, subnets, and instances).

## Rationale

Exposing Cassandra ports directly to the internet (`0.0.0.0/0`) introduces a significant security risk. Such exposure makes the database vulnerable to brute-force attacks, unauthorized data access, data exfiltration, and denial-of-service (DoS) attacks. Access should be limited strictly to trusted IP addresses and services.

## Impact

All external connections to Cassandra from outside the affected VPC(s) can be blocked. If there is a legitimate business requirement for remote access (for example, administrative access to Cassandra resources), specific trusted source IP addresses should be explicitly defined in firewall rules to whitelist access to the required ports.

## Audit

This policy flags a *Google GCE Network* as `INCOMPLIANT` if it includes at least one *Firewall Rule* that meets all of the following conditions:

- `Source Ranges` is **0.0.0.0/0** or **::/0**
- `Direction` is **INGRESS**
- `Allowed Protocols / Ports JSON` specifies the **tcp** `protocol` and includes any of the following ports in the `startPort` - `endPort` range: **7000**, **7001**, **7199**, **8888**, **9042**, **9160**, **61620**, **61621**.
