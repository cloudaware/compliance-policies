# Description

This policy identifies Google GCE Networks that have Firewall Rules allowing unrestricted incoming traffic (`0.0.0.0/0`) from the internet to the standard FTP ports: `TCP/20` (data) and `TCP/21` (control).

In GCP, **Firewall Rules** are defined at the **VPC Network** level. Each rule either *allows* or *denies* traffic based on its configuration. These configurations specify the type of traffic (e.g., protocols and ports) and the source or destination (e.g., IP addresses, subnets, and instances).

## Rationale

File Transfer Protocol (FTP) is a legacy protocol that transmits data, including usernames and passwords, in cleartext. Exposing FTP servers to the public internet creates significant security risks, including credential theft via network sniffing, brute-force attacks, and unauthorized access. Such exposure can result in data exfiltration, unauthorized file uploads, or compromise of internal resources.

## Impact

All FTP connections from outside the affected VPC(s) can be blocked.
If there is a legitimate business requirement for remote access, specific trusted source IP addresses should be explicitly defined in firewall rules to whitelist access only to the required FTP ports.

## Audit

This policy flags a *Google GCE Network* as `INCOMPLIANT` if it includes at least one *Firewall Rule* that meets all of the following conditions:

- `Source Ranges` is **0.0.0.0/0** or **::/0**
- `Direction` is **INGRESS**
- `Allowed Protocols / Ports JSON` specifies the **tcp** `protocol` and includes either **20** or **21** in the `startPort` - `endPort` range.
