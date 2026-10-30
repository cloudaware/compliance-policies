# Remediation

## Associate the NAT Gateway with a Subnet

If the gateway is required for outbound connectivity, associate it with the intended subnet after confirming the required outbound IP addresses, routing dependencies, and affected workloads.

### Azure portal

1. Open **NAT gateways** and select the NAT Gateway.
2. Select **Subnets**, then select the virtual network and subnet or subnets to associate.
3. Save the association and verify outbound connectivity from workloads in each subnet.

### Azure CLI

```sh
az network vnet subnet update \
    --resource-group "{{resource-group-name}}" \
    --vnet-name "{{virtual-network-name}}" \
    --name "{{subnet-name}}" \
    --nat-gateway "{{nat-gateway-name}}"
```

## Delete an Unused NAT Gateway

If the gateway is not required, delete it only after confirming that no current or planned workload depends on its outbound IP addresses.

```sh
az network nat gateway delete \
    --resource-group "{{resource-group-name}}" \
    --name "{{nat-gateway-name}}"
```

## Considerations

- A NAT Gateway changes the outbound IP address used by associated subnets. Confirm firewall, allowlist, and partner integration requirements before association or deletion.
- Review associated public IP addresses and public IP prefixes separately. They can remain billable after the NAT Gateway is deleted.
