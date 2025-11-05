# Description

This policy identifies Google GCE Networks that have Firewall Rules allowing unrestricted incoming traffic (`0.0.0.0/0`) from the internet to the Simple Mail Transfer Protocol (SMTP) port, `TCP 25`.

In GCP, **Firewall Rules** are defined at the **VPC Network** level. Each rule either *allows* or *denies* traffic based on its configuration. These configurations specify the type of traffic (e.g., protocols and ports) and the source or destination (e.g., IP addresses, subnets, and instances).

## Rationale

Exposing an SMTP server to the public internet creates substantial security and operational risks. Open or misconfigured mail relays are frequently exploited by attackers and spammers to distribute large volumes of unsolicited or malicious email. Such abuse can quickly lead to the server’s IP address being blocklisted, disrupting legitimate mail delivery and damaging domain reputation. Additionally, public SMTP ports are often targeted for reconnaissance and exploitation attempts against mail server software vulnerabilities.

SMTP access should be tightly restricted to trusted mail transfer agents or relays within secure network boundaries.

## Impact

All SMTP connections from outside of the network to the concerned VPC(s) can be blocked. If there is a business requirement to allow SMTP traffic from external networks, firewall rules must explicitly whitelist trusted source IP ranges instead of allowing unrestricted public access.

## Audit

This policy flags a *Google GCE Network* as `INCOMPLIANT` if it includes at least one *Firewall Rule* that meets all of the following conditions:

- `Source Ranges` is **0.0.0.0/0** or **::/0**
- `Direction` is **INGRESS**
- `Allowed Protocols / Ports JSON` specifies the **tcp** `protocol` and the `startPort` - `endPort` range includes **25**.
