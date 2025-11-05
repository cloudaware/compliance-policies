# Description

This policy identifies Google GCE Networks that have Firewall Rules allowing unrestricted incoming traffic (`0.0.0.0/0`) from the internet to NetBIOS ports: (TCP/UDP) `137`, `138`, and `139`.

In GCP, **Firewall Rules** are defined at the **VPC Network** level. Each rule either *allows* or *denies* traffic based on its configuration. These configurations specify the type of traffic (e.g., protocols and ports) and the source or destination (e.g., IP addresses, subnets, and instances).

## Rationale

NetBIOS is a legacy protocol used for name resolution and file/printer sharing in older Windows environments. It is not designed to be exposed to the public internet and has a long history of security vulnerabilities. Public exposure of these ports can lead to information disclosure, denial-of-service attacks, and exploitation by worms or malware that target NetBIOS services. There is almost no legitimate reason to allow unrestricted public access to these ports.

## Impact

All NetBIOS connections from outside of the network to the concerned VPC(s) can be blocked. If there is a legitimate operational need for remote access, specific trusted source IP addresses should be explicitly defined in firewall rules to whitelist access only to the required NetBIOS ports.

## Audit

This policy flags a *Google GCE Network* as `INCOMPLIANT` if it includes at least one *Firewall Rule* that meets all of the following conditions:

- `Source Ranges` is **0.0.0.0/0** or **::/0**
- `Direction` is **INGRESS**
- `Allowed Protocols / Ports JSON` specifies the **tcp** or **udp** `protocols` and includes any of the following ports in the `startPort` - `endPort` range: **137**, **138**, **139**.
