# Description

Network security groups should be periodically evaluated for port misconfigurations. Where certain ports and protocols may be exposed to the Internet, they should be evaluated for necessity and restricted wherever they are not explicitly required and narrowly configured.

## Rationale

The potential security problem with using HTTP(S) over the Internet is that attackers can use various brute force techniques to gain access to Azure resources. Once the attackers gain access, they can use the resource as a launch point for compromising other resources within the Azure tenant.

## Audit

### From Azure Portal

1. Open the `Networking` blade for the specific Virtual machine in Azure portal.
2. Verify that the `INBOUND PORT RULES` does not have a rule for UDP such as:
    - port = `80`/`443`,
    - protocol = `TCP`,
    - Source = `Any` OR `Internet`

### From Azure CLI

List Network security groups with corresponding non-default Security rules:

```sh
az network nsg list --query [*].[name,securityRules]
```

Ensure that none of the NSGs have security rule as below:

```
"access" : "Allow" 
"destinationPortRange" : "80/443" or "*" or "[port range containing 80/443]"
"direction" : "Inbound" 
"protocol" : "UDP" 
"sourceAddressPrefix" : "*" or "0.0.0.0" or "<nw>/0" or "/0" or "internet" or "any"
```

## References

1. Express Route: <https://docs.microsoft.com/en-us/azure/expressroute/>
2. Site-to-Site VPN: <https://docs.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-howto-site-to-site-resource-manager-portal>
3. Point-to-Site VPN: <https://docs.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-howto-point-to-site-resource-manager-portal>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-network-security#ns-1-establish-network-segmentation-boundaries>
