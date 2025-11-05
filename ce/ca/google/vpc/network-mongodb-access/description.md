# Description

This policy identifies Google GCE Networks that have Firewall Rules allowing unrestricted incoming traffic (`0.0.0.0/0`) from the internet to the standard MongoDB ports: `TCP/27017-27019`.

In GCP, **Firewall Rules** are defined at the **VPC Network** level. Each rule either *allows* or *denies* traffic based on its configuration. These configurations specify the type of traffic (e.g., protocols and ports) and the source or destination (e.g., IP addresses, subnets, and instances).

## Rationale

MongoDB is a widely used NoSQL database that, in many default configurations and older versions, lacks authentication and can be exposed to the internet. Publicly accessible MongoDB instances pose a severe security risk. Attackers continuously scan for open MongoDB ports, and upon discovery, can connect to the database to steal, delete, or encrypt data for ransom. Access to MongoDB ports should always be restricted to application servers or trusted administrative systems, following the principle of least privilege.

## Impact

All MongoDB connections from outside of the network to the concerned VPC(s) can be blocked. If there is a legitimate operational need for remote access, specific trusted source IP addresses should be explicitly defined in firewall rules to whitelist access to the necessary MongoDB ports.

## Audit

This policy flags a *Google GCE Network* as `INCOMPLIANT` if it includes at least one *Firewall Rule* that meets all of the following conditions:

- `Source Ranges` is **0.0.0.0/0** or **::/0**
- `Direction` is **INGRESS**
- `Allowed Protocols / Ports JSON` specifies the **tcp** `protocol` and includes any of the following ports in the `startPort` - `endPort` range: **27017**, **27018**, **27019**.
