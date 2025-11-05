# Description

This policy identifies Google GCE Networks that have Firewall Rules allowing unrestricted incoming traffic (`0.0.0.0/0`) from the internet to the Telnet port `TCP/23`.

In GCP, **Firewall Rules** are defined at the **VPC Network** level. Each rule either *allows* or *denies* traffic based on its configuration. These configurations specify the type of traffic (e.g., protocols and ports) and the source or destination (e.g., IP addresses, subnets, and instances).

## Rationale

Telnet is an obsolete and insecure remote access protocol. It transmits all information, including usernames and passwords, in plaintext, making it highly susceptible to eavesdropping. Any attacker on the same network can intercept credentials and session data. Exposing a Telnet service to the public internet makes it a frequent target for automated scanning and attacks. Secure alternatives, such as SSH, have largely replaced Telnet for remote administration.

## Impact

All Telnet connections from outside of the network to the concerned VPC(s) can be blocked. If remote Telnet access is required for legitimate business purposes, firewall rules should explicitly whitelist trusted source IP addresses to limit exposure.

## Audit

This policy flags a *Google GCE Network* as `INCOMPLIANT` if it includes at least one *Firewall Rule* that meets all of the following conditions:

- `Source Ranges` is **0.0.0.0/0** or **::/0**
- `Direction` is **INGRESS**
- `Allowed Protocols / Ports JSON` specifies the **tcp** `protocol` and the `startPort` - `endPort` range includes **23**.
