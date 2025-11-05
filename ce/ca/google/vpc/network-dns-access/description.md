# Description

This policy identifies Google GCE Networks that have Firewall Rules allowing unrestricted incoming traffic (`0.0.0.0/0`) from the internet to the DNS port (`53`) over TCP or UDP.

In GCP, **Firewall Rules** are defined at the **VPC Network** level. Each rule either *allows* or *denies* traffic based on its configuration. These configurations specify the type of traffic (e.g., protocols and ports) and the source or destination (e.g., IP addresses, subnets, and instances).

## Rationale

Exposing a VM’s DNS service to the public internet presents a significant security risk. Open DNS resolvers can be abused by attackers to launch DNS amplification and reflection attacks, a type of Distributed Denial-of-Service (DDoS) attack. By sending small, forged DNS queries to an open resolver, an attacker can force it to generate much larger responses directed at a target, potentially overwhelming the target network.

Access to DNS services should be restricted to trusted sources only, to prevent misuse of your infrastructure for such attacks.

## Impact

All DNS connections from outside of the network to the concerned VPC(s) can be blocked. If there is a legitimate business requirement for remote DNS access (for example, for administrative or operational purposes), specific trusted source IP addresses should be explicitly defined in firewall rules to whitelist access to port 53.

## Audit

This policy flags a *Google GCE Network* as `INCOMPLIANT` if it includes at least one *Firewall Rule* that meets all of the following conditions:

- `Source Ranges` is **0.0.0.0/0** or **::/0**
- `Direction` is **INGRESS**
- `Allowed Protocols / Ports JSON` specifies the **tcp** or **udp** `protocol` and the `startPort` - `endPort` range includes **53**.
