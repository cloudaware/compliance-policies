# Description

This policy identifies Google GCE Networks that have Firewall Rules allowing unrestricted incoming traffic (`0.0.0.0/0`) from the internet to the Secure Shell (SSH) port, `TCP/22`.

In GCP, **Firewall Rules** are defined at the **VPC Network** level. Each rule either *allows* or *denies* traffic based on its configuration. These configurations specify the type of traffic (e.g., protocols and ports) and the source or destination (e.g., IP addresses, subnets, and instances).

## Rationale

SSH is the primary protocol for remote administration of Linux-based virtual machines. Exposing the SSH port to the entire internet makes it a persistent target for automated attacks. Malicious actors continuously scan for open port 22 to launch brute-force password attacks, credential stuffing, or exploit known vulnerabilities in SSH daemons. A successful attack can lead to complete compromise of the virtual machine. Access should be restricted to trusted IP addresses, such as a corporate VPN or bastion host, or managed through more secure mechanisms like Google Cloud's Identity-Aware Proxy (IAP).

## Impact

All Secure Shell (SSH) connections from outside of the network to the concerned VPC(s) can be blocked. If remote SSH access is required for legitimate business purposes, firewall rules should explicitly whitelist trusted source IP addresses to limit exposure.

## Audit

This policy flags a *Google GCE Network* as `INCOMPLIANT` if it includes at least one *Firewall Rule* that meets all of the following conditions:

- `Source Ranges` is **0.0.0.0/0** or **::/0**
- `Direction` is **INGRESS**
- `Allowed Protocols / Ports JSON` specifies the **tcp** `protocol` and the `startPort` - `endPort` range includes **22**.

## References

1. <https://cloud.google.com/vpc/docs/firewalls#blockedtraffic>
2. <https://cloud.google.com/blog/products/identity-security/cloud-iap-enables-context-aware-access-to-vms-via-ssh-and-rdp-without-bastion-hosts>
