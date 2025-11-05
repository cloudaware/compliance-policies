# Description

This policy identifies Google GCE Networks that have Firewall Rules allowing unrestricted incoming traffic (`0.0.0.0/0`) from the internet to the Post Office Protocol 3 (POP3) port, `TCP/110`.

In GCP, **Firewall Rules** are defined at the **VPC Network** level. Each rule either *allows* or *denies* traffic based on its configuration. These configurations specify the type of traffic (e.g., protocols and ports) and the source or destination (e.g., IP addresses, subnets, and instances).

## Rationale

POP3 is a legacy email retrieval protocol that transmits both authentication credentials (usernames and passwords) and email content in cleartext. Exposing a POP3 service to the public internet introduces a severe security risk, as attackers can intercept or manipulate unencrypted traffic. Such exposure may result in credential theft, unauthorized mailbox access, and data compromise. To ensure secure email communication, POP3 should be replaced with more secure alternatives such as IMAP over SSL/TLS (IMAPS) or other encrypted email access methods.

## Impact

All POP3 connections from outside of the network to the concerned VPC(s) can be blocked. If there is a legitimate business requirement for external access, specific trusted source IP addresses should be explicitly defined in firewall rules to whitelist access to the POP3 port for the relevant VPC(s).

## Audit

This policy flags a *Google GCE Network* as `INCOMPLIANT` if it includes at least one *Firewall Rule* that meets all of the following conditions:

- `Source Ranges` is **0.0.0.0/0** or **::/0**
- `Direction` is **INGRESS**
- `Allowed Protocols / Ports JSON` specifies the **tcp** `protocol` and the `startPort` - `endPort` range includes **110**.
