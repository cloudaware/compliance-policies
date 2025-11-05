# Description

This policy identifies Google GCE Networks that have Firewall Rules allowing unrestricted incoming traffic (`0.0.0.0/0`) from the internet to all ports within a VPC Network.

In GCP, **Firewall Rules** are defined at the **VPC Network** level. Each rule either *allows* or *denies* traffic based on its configuration. These configurations specify the type of traffic (e.g., protocols and ports) and the source or destination (e.g., IP addresses, subnets, and instances).

## Rationale

Allowing unrestricted access to all ports across a network drastically increases the attack surface of every resource within that environment. Such a configuration can unintentionally expose internal services to reconnaissance, brute-force attempts, and other malicious activity originating from the public internet.
To maintain a strong security posture, firewall rules should restrict access to only required ports and trusted IP ranges.

## Impact

External connections to the affected VPC(s) from untrusted sources may be blocked.
If legitimate business needs require remote access, trusted source IP addresses should be explicitly defined in firewall rules to whitelist access only to the specific ports that are necessary for operation.

## Audit

This policy flags a *Google GCE Network* as `INCOMPLIANT` if it includes at least one *Firewall Rule* that meets all of the following conditions:

- `Source Ranges` is **0.0.0.0/0** or **::/0**
- `Direction` is **INGRESS**
- `Allowed Protocols / Ports JSON` specifies **tcp**, **udp** or **all** `protocols` and the `startPort` - `endPort` range is set to `1-65535` or left unset (`Null`).
