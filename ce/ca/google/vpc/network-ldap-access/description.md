# Description

This policy identifies Google GCE Networks that have Firewall Rules allowing unrestricted incoming traffic (`0.0.0.0/0`) from the internet to the LDAP ports: TCP/UDP 389 (standard LDAP) and TCP 636 (LDAP over SSL).

In GCP, **Firewall Rules** are defined at the **VPC Network** level. Each rule either *allows* or *denies* traffic based on its configuration. These configurations specify the type of traffic (e.g., protocols and ports) and the source or destination (e.g., IP addresses, subnets, and instances).

## Rationale

LDAP is a core protocol for accessing and maintaining directory services. Exposing LDAP servers directly to the public internet introduces serious security risks. It allows attackers to query directories anonymously, potentially enumerating user accounts, email addresses, and organizational structures - valuable information for phishing, social engineering, and password-spraying attacks.

Additionally, unencrypted LDAP traffic (port 389) transmits all data, including authentication credentials, in cleartext, making it easily intercepted by attackers. Access to LDAP services should be restricted to trusted internal networks or specific administrative endpoints, and secure LDAP (port 636) should be used whenever possible.

## Impact

All LDAP connections from outside of the network to the concerned VPC(s) can be blocked. If there is a legitimate requirement for remote administrative access, trusted source IP addresses should be explicitly defined in firewall rules to whitelist access only to the necessary LDAP ports.

## Audit

This policy flags a *Google GCE Network* as `INCOMPLIANT` if it includes at least one *Firewall Rule* that meets all of the following conditions:

- `Source Ranges` is **0.0.0.0/0** or **::/0**
- `Direction` is **INGRESS**
- `Allowed Protocols / Ports JSON` specifies the **tcp** or **udp** `protocols` and includes either **389** or **636** in the `startPort` - `endPort` range.
