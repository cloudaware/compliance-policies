# Description

This policy identifies Google GCE Networks that have Firewall Rules allowing unrestricted incoming traffic (`0.0.0.0/0`) from the internet to the default Elasticsearch ports: TCP/9200 (REST API) and TCP/9300 (inter-node communication).

In GCP, **Firewall Rules** are defined at the **VPC Network** level. Each rule either *allows* or *denies* traffic based on its configuration. These configurations specify the type of traffic (e.g., protocols and ports) and the source or destination (e.g., IP addresses, subnets, and instances).

## Rationale

Exposing an Elasticsearch cluster to the public internet is highly risky and has been a common cause of data breaches. Older versions of Elasticsearch may have no authentication by default, allowing anyone with network access to read, modify, or delete all data in the cluster. Even when security features are enabled, unnecessary exposure of these ports increases the attack surface, making the cluster vulnerable to reconnaissance, brute-force attacks, and exploitation of known vulnerabilities.

## Impact

All external connections to Elasticsearch from outside the affected VPC(s) can be blocked.
If there is a legitimate business need for remote access, specific trusted source IP addresses should be explicitly defined in firewall rules to whitelist access to the required Elasticsearch ports.

## Audit

This policy flags a *Google GCE Network* as `INCOMPLIANT` if it includes at least one *Firewall Rule* that meets all of the following conditions:

- `Source Ranges` is **0.0.0.0/0** or **::/0**
- `Direction` is **INGRESS**
- `Allowed Protocols / Ports JSON` specifies the **tcp** `protocol` and includes either **9200** or **9300** in the `startPort` - `endPort` range.
