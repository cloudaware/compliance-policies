# Description

Ensure that Azure VM Scale Set Instances are not configured with Network Security Group (NSG) rules that allow unrestricted inbound access to HTTP (port 80) and HTTPS (port 443) from the public internet. Inbound access to these ports should be restricted to trusted IP address ranges or fronted by secure services such as Azure Application Gateway or Azure Front Door to reduce exposure and maintain a strong security posture.

## Rationale

NSGs are critical components for controlling network traffic to and from Azure resources. Inbound access to ports 80 (HTTP) and 443 (HTTPS) from any source (`0.0.0.0/0`, `::/0`) significantly increases the attack surface of an instance and may allow unauthenticated access to web applications or services. Periodically auditing NSG rules and restricting internet exposure to only what is strictly necessary is a key security best practice. Where public access is required, it should be scoped to specific source IPs or protected by additional layers such as web application firewalls (WAFs) or reverse proxies.

## Impact

Restricting inbound traffic to ports 80 and 443 may disrupt publicly accessible services hosted on the VM. To prevent service outages, implement changes during a planned maintenance window and thoroughly test connectivity from required sources.

## Audit

This policy flagged an *Azure VM Scale Set Instance* as `INCOMPLIANT` if it is associated with a *Network Interface* that is connected to an *NSG* containing at least one **Inbound Security Rule** that meets all of the following conditions:

- `Direction` is **Inbound**.
- `Access` is **Allow**.
- `Protocol` is either **Tcp**, **Udp**, `*`, or `null`.
- `Source Address Prefix` is either **Internet**, `*` **0.0.0.0**, **/0**, or **Any**.
- `Destination Port` is **80** or **443**.

If the `Direction`, `Access`, `Protocol`, or `Source Address Prefix` fields do not match the criteria above, the VM is marked as `INAPPLICABLE`.

If the `Destination Port` does not match, the VM is considered `COMPLIANT`.
