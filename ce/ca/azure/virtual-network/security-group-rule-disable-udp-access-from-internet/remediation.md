# Remediation

Where UDP is not explicitly required and narrowly configured for resources attached to the Network Security Group, Internet-level access to your Azure resources should be restricted or eliminated.

For internal access to relevant resources, configure an encrypted network tunnel such as:

- [ExpressRoute](https://docs.microsoft.com/en-us/azure/expressroute/).
- [Site-to-site VPN](https://docs.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-howto-site-to-site-resource-manager-portal).
- [Point-to-site VPN](https://docs.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-howto-point-to-site-resource-manager-portal).
