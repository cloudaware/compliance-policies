# Description

This policy identifies Google GCE Networks that have Firewall Rules allowing unrestricted incoming traffic (`0.0.0.0/0`) from the internet to the common Directory Services port (`445`).

In GCP, **Firewall Rules** are defined at the **VPC Network** level. Each rule either *allows* or *denies* traffic based on its configuration. These configurations specify the type of traffic (e.g., protocols and ports) and the source or destination (e.g., IP addresses, subnets, and instances).

## Rationale

Directory services are a foundational component of enterprise identity and access management. Exposing port 445 to the public internet introduces a critical security risk by allowing unauthorized users to attempt connections, enumerate accounts, or launch credential-based attacks such as password spraying or brute-forcing.

Access to these services should be restricted exclusively to trusted internal networks or designated administrative systems.

## Impact

All external connections to Directory services from outside the affected VPC(s) can be blocked. If there is a legitimate business requirement for remote access (for example, administrative access to Cassandra resources), specific trusted source IP addresses should be explicitly defined in firewall rules to whitelist access to the required ports.

## Audit

This policy flags a *Google GCE Network* as `INCOMPLIANT` if it includes at least one *Firewall Rule* that meets all of the following conditions:

- `Source Ranges` is **0.0.0.0/0** or **::/0**
- `Direction` is **INGRESS**
- `Allowed Protocols / Ports JSON` specifies the **tcp** or **udp** `protocol` and the `startPort` - `endPort` range includes **445**.
