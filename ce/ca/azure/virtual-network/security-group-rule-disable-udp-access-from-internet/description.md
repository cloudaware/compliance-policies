# Description

Network security groups should be periodically evaluated for port misconfigurations. Where certain ports and protocols may be exposed to the Internet, they should be evaluated for necessity and restricted wherever they are not explicitly required.

## Rationale

The potential security problem with broadly exposing UDP services over the Internet is that attackers can use DDoS amplification techniques to reflect spoofed UDP traffic from Azure Virtual Machines. The most common types of these attacks use exposed DNS, NTP, SSDP, SNMP, CLDAP and other UDP-based services as amplification sources for disrupting services of other machines on the Azure Virtual Network or even attack networked devices outside of Azure.

## Audit

### From Azure Portal

1. For each VM, open the Networking blade.
2. Verify that the `INBOUND PORT RULES` does not have a rule for HTTP(S) such as:
    - protocol = `UDP`.
    - Source = `Any` OR `Internet`.

### From Azure CLI

List Network security groups with corresponding non-default Security rules:

```sh
az network nsg list --query [*].[name,securityRules]
```

Ensure that none of the NSGs have security rule as below:

```
"access" : "Allow" 
"destinationPortRange" : "*" or "[port range containing 53, 123, 161, 389, 1900, or other vulnerable UDP-based services]"
"direction" : "Inbound" 
"protocol" : "UDP" 
"sourceAddressPrefix" : "*" or "0.0.0.0" or "<nw>/0" or "/0" or "internet" or "any"
```

## Default Value

By default, UDP access from internet is `not enabled`.

## References

1. <https://docs.microsoft.com/en-us/azure/security/fundamentals/network-best-practices#secure-your-critical-azure-service-resources-to-only-your-virtual-networks>
2. <https://docs.microsoft.com/en-us/azure/security/fundamentals/ddos-best-practices>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-network-security#ns-1-establish-network-segmentation-boundaries>
4. ExpressRoute: <https://docs.microsoft.com/en-us/azure/expressroute/>
5. Site-to-site VPN: <https://docs.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-howto-site-to-site-resource-manager-portal>
6. Point-to-site VPN: <https://docs.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-howto-point-to-site-resource-manager-portal>
