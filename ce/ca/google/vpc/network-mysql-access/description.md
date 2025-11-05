# Description

This policy identifies Google GCE Networks that have Firewall Rules allowing unrestricted incoming traffic (`0.0.0.0/0`) from the internet to the standard MySQL database port: `TCP/3306`.

In GCP, **Firewall Rules** are defined at the **VPC Network** level. Each rule either *allows* or *denies* traffic based on its configuration. These configurations specify the type of traffic (e.g., protocols and ports) and the source or destination (e.g., IP addresses, subnets, and instances).

## Rationale

Exposing a MySQL database directly to the public internet introduces significant security risks. It makes the database server a target for brute-force attacks, exploitation of known vulnerabilities, and denial-of-service attacks. Best practice is to place database servers in private network segments, allowing access only from application servers or trusted administrative hosts that require a direct connection.

## Impact

All MySQL connections from outside of the network to the concerned VPC(s) can be blocked. If there is a legitimate operational need for remote access, specific trusted source IP addresses should be explicitly defined in firewall rules to whitelist access only to port 3306.

## Audit

This policy flags a *Google GCE Network* as `INCOMPLIANT` if it includes at least one *Firewall Rule* that meets all of the following conditions:

- `Source Ranges` is **0.0.0.0/0** or **::/0**
- `Direction` is **INGRESS**
- `Allowed Protocols / Ports JSON` specifies the **tcp** or **udp** `protocol` and the `startPort` - `endPort` range includes **3306**.
