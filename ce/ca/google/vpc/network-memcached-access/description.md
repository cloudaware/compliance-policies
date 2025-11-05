# Description

This policy identifies Google GCE Networks that have Firewall Rules allowing unrestricted incoming traffic (`0.0.0.0/0`) from the internet to the standard Memcached ports `11211`, `11214`, or `11215` over TCP or UDP.

In GCP, **Firewall Rules** are defined at the **VPC Network** level. Each rule either *allows* or *denies* traffic based on its configuration. These configurations specify the type of traffic (e.g., protocols and ports) and the source or destination (e.g., IP addresses, subnets, and instances).

## Rationale

Memcached is a high-performance, in-memory key-value store, typically used for caching. Exposing a Memcached server to the public internet introduces a critical security risk. Malicious actors can connect to the server to read cached data, inject malicious entries, or delete existing data. Additionally, Memcached instances are often abused in DDoS reflection and amplification attacks, where attackers exploit your server to flood a target with unwanted traffic.

## Impact

All Memcached connections from outside of the network to the concerned VPC(s) can be blocked. If there is a legitimate operational requirement for remote access, specific trusted source IP addresses should be explicitly defined in firewall rules to whitelist access to the required Memcached ports.

## Audit

This policy flags a *Google GCE Network* as `INCOMPLIANT` if it includes at least one *Firewall Rule* that meets all of the following conditions:

- `Source Ranges` is **0.0.0.0/0** or **::/0**
- `Direction` is **INGRESS**
- `Allowed Protocols / Ports JSON` specifies the **tcp** or **udp** `protocols` and includes any of the following ports in the `startPort` - `endPort` range: **11211**, **11214**, **11215**.
