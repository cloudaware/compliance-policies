# Description

This policy identifies Google GCE Networks that have Firewall Rules allowing unrestricted incoming traffic (`0.0.0.0/0`) from the internet to the Remote Desktop Protocol (RDP) port, `TCP/UDP 3389`.

In GCP, **Firewall Rules** are defined at the **VPC Network** level. Each rule either *allows* or *denies* traffic based on its configuration. These configurations specify the type of traffic (e.g., protocols and ports) and the source or destination (e.g., IP addresses, subnets, and instances).

## Rationale

The RDP port is used for remote administrative access to Windows-based virtual machines. Exposing this port to the public internet poses a significant security risk, as it becomes a prime target for automated scanners and attackers performing brute-force, credential-stuffing, and vulnerability-based attacks. A successful exploit could lead to unauthorized access or complete compromise of the affected virtual machine.

To reduce risk, RDP access should be limited to specific administrative IP addresses or managed securely through Identity-Aware Proxy (IAP) or VPN access.

## Impact

All Remote Desktop Protocol (RDP) connections from outside of the network to the concerned VPC(s) can be blocked. If external administrative access is required, firewall rules should be restricted to allow connections only from specific, trusted IP addresses that are explicitly authorized.

## Audit

This policy flags a *Google GCE Network* as `INCOMPLIANT` if it includes at least one *Firewall Rule* that meets all of the following conditions:

- `Source Ranges` is **0.0.0.0/0** or **::/0**
- `Direction` is **INGRESS**
- `Allowed Protocols / Ports JSON` specifies the **tcp** or **udp** `protocols` and the `startPort` - `endPort` range includes **3389**.

## References

1. <https://cloud.google.com/vpc/docs/firewalls#blockedtraffic>
2. <https://cloud.google.com/blog/products/identity-security/cloud-iap-enables-context-aware-access-to-vms-via-ssh-and-rdp-without-bastion-hosts>
