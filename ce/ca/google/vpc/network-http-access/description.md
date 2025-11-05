# Description

This policy identifies Google GCE Networks that have Firewall Rules allowing unrestricted incoming traffic (`0.0.0.0/0`) from the internet to the HTTP port 80.

In GCP, **Firewall Rules** are defined at the **VPC Network** level. Each rule either *allows* or *denies* traffic based on its configuration. These configurations specify the type of traffic (e.g., protocols and ports) and the source or destination (e.g., IP addresses, subnets, and instances).

## Rationale

While public web servers require accessibility, transmitting traffic over unencrypted HTTP is a security risk. HTTP sends all data in plaintext, making it vulnerable to eavesdropping and man-in-the-middle (MITM) attacks, where an attacker can intercept, read, or modify the communication between users and the server. This can result in the theft of sensitive information such as session cookies, login credentials, or personal data submitted via web forms.

The recommended best practice is to enforce HTTPS for all web traffic to ensure that communications are encrypted.

## Impact

All HTTP connections from outside of the network to the concerned VPC(s) can be blocked. If there is a legitimate business requirement for external access, specific trusted source IP addresses should be explicitly defined in firewall rules to whitelist access only to port 80.

## Audit

This policy flags a *Google GCE Network* as `INCOMPLIANT` if it includes at least one *Firewall Rule* that meets all of the following conditions:

- `Source Ranges` is **0.0.0.0/0** or **::/0**
- `Direction` is **INGRESS**
- `Allowed Protocols / Ports JSON` specifies the **tcp** or **udp** `protocol` and the `startPort` - `endPort` range includes **80**.
