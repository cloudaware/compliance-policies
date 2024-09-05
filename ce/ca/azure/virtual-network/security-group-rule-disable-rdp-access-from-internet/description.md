# Description

Network security groups should be periodically evaluated for port misconfigurations. Where certain ports and protocols may be exposed to the Internet, they should be evaluated for necessity and restricted wherever they are not explicitly required.

## Rationale

The potential security problem with using RDP over the Internet is that attackers can use various brute force techniques to gain access to Azure Virtual Machines. Once the attackers gain access, they can use a virtual machine as a launch point for compromising other machines on an Azure Virtual Network or even attack networked devices outside of Azure.

## Audit

### From Azure Portal

1. For each VM, open the `Networking` blade.
2. Verify that the `INBOUND PORT RULES` **does not** have a rule for RDP such as:
    - port = `3389`.
    - protocol = `TCP` OR `ANY`.
    - Source = `Any` OR `Internet`.

### From Azure CLI

List Network security groups with corresponding non-default Security rules:

```sh
az network nsg list --query [*].[name,securityRules]
```

Ensure that none of the NSGs have security rule as below:

```
"access" : "Allow" 
"destinationPortRange" : "3389" or "*" or "[port range containing 3389]" 
"direction" : "Inbound" 
"protocol" : "TCP" or "*" 
"sourceAddressPrefix" : "*" or "0.0.0.0" or "<nw>/0" or "/0" or "internet" or "any"
```

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [22730e10-96f6-4aac-ad84-9383d35b5917](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F22730e10-96f6-4aac-ad84-9383d35b5917) - **Name**: `Management ports should be closed on your virtual machines`

## Default Value

By default, RDP access from internet is `not enabled`.

## References

1. <https://docs.microsoft.com/en-us/azure/security/azure-security-network-security-best-practices#disable-rdpssh-access-to-azure-virtual-machines>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-network-security#ns-1-establish-network-segmentation-boundaries>
3. Express Route: <https://docs.microsoft.com/en-us/azure/expressroute/>
4. Site-to-Site VPN: <https://docs.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-howto-site-to-site-resource-manager-portal>
5. Point-to-Site VPN: <https://docs.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-howto-point-to-site-resource-manager-portal>
