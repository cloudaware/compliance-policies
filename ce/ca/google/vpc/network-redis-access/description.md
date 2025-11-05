# Description

This policy identifies Google GCE Networks that have Firewall Rules allowing unrestricted incoming traffic (`0.0.0.0/0`) from the internet to the default Redis port, `TCP 6379`.

In GCP, **Firewall Rules** are defined at the **VPC Network** level. Each rule either *allows* or *denies* traffic based on its configuration. These configurations specify the type of traffic (e.g., protocols and ports) and the source or destination (e.g., IP addresses, subnets, and instances).

## Rationale

Redis is an in-memory key-value store commonly used as a cache, message broker, or database. By default, Redis does not enforce authentication and is designed for use within trusted private networks. Exposing Redis to the public internet is a critical security vulnerability that allows unauthenticated users to connect, read, modify, or delete all stored data. Attackers could also exploit certain Redis commands to execute malicious code or gain control over the underlying server.

Redis instances should always be deployed in private subnets with access restricted to authorized application hosts and administrators only.

## Impact

All Redis connections from outside of the network to the concerned VPC(s) can be blocked. If external administrative access is required, firewall rules must restrict Redis connectivity to trusted source IPs explicitly whitelisted for access to port 6379.

## Audit

This policy flags a *Google GCE Network* as `INCOMPLIANT` if it includes at least one *Firewall Rule* that meets all of the following conditions:

- `Source Ranges` is **0.0.0.0/0** or **::/0**
- `Direction` is **INGRESS**
- `Allowed Protocols / Ports JSON` specifies the **tcp** `protocol` and the `startPort` - `endPort` range includes **6379**.
