# Description

This policy identifies Google GCE Networks that have Firewall Rules allowing unrestricted incoming traffic (`0.0.0.0/0`) from the internet to the PostgreSQL database port `TCP/UDP 5432`.

In GCP, **Firewall Rules** are defined at the **VPC Network** level. Each rule either *allows* or *denies* traffic based on its configuration. These configurations specify the type of traffic (e.g., protocols and ports) and the source or destination (e.g., IP addresses, subnets, and instances).

## Rationale

Exposing a PostgreSQL database directly to the public internet introduces a critical security vulnerability. Publicly accessible databases are common targets for attackers who attempt brute-force login attempts, exploit unpatched vulnerabilities, or launch denial-of-service (DoS) attacks. To maintain strong security posture, PostgreSQL instances should reside in private network segments and be accessible only to trusted application servers and authorized administrative hosts through secure channels.

## Impact

All PostgreSQL connections from outside of the network to the concerned VPC(s) can be blocked. If there is a legitimate business requirement for external access, specific trusted source IP addresses should be defined in the firewall rules to whitelist access to the PostgreSQL port for the relevant VPC(s).

## Audit

This policy flags a *Google GCE Network* as `INCOMPLIANT` if it includes at least one *Firewall Rule* that meets all of the following conditions:

- `Source Ranges` is **0.0.0.0/0** or **::/0**
- `Direction` is **INGRESS**
- `Allowed Protocols / Ports JSON` specifies the **tcp** or **udp** `protocol` and the `startPort` - `endPort` range includes **5432**.
