# Description

This policy identifies Google GCE Networks that have Firewall Rules allowing unrestricted incoming traffic (`0.0.0.0/0`) from the internet to common Oracle Database ports: `1521`, `2483`, and `2484` over TCP or UDP.

In GCP, **Firewall Rules** are defined at the **VPC Network** level. Each rule either *allows* or *denies* traffic based on its configuration. These configurations specify the type of traffic (e.g., protocols and ports) and the source or destination (e.g., IP addresses, subnets, and instances).

## Rationale

Exposing Oracle Database ports directly to the public internet poses a critical security risk. Database servers are high-value targets and should never be directly accessible from untrusted networks. Public exposure increases the risk of brute-force credential attacks, exploitation of known Oracle vulnerabilities, and denial-of-service (DoS) attacks. Database access should be restricted to trusted application servers and administrative hosts within private network segments.

## Impact

All OracleDB connections from outside of the network to the concerned VPC(s) can be blocked. If there is a legitimate operational need for remote access, specific trusted source IP addresses should be explicitly defined in firewall rules to whitelist access to the required Oracle Database ports.

## Audit

This policy flags a *Google GCE Network* as `INCOMPLIANT` if it includes at least one *Firewall Rule* that meets all of the following conditions:

- `Source Ranges` is **0.0.0.0/0** or **::/0**
- `Direction` is **INGRESS**
- `Allowed Protocols / Ports JSON` specifies the **tcp** or **udp** `protocols` and includes any of the following ports in the `startPort` - `endPort` range: **1521**, **2483**, **2484**.
