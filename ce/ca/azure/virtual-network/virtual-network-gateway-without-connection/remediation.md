# Remediation

## Delete the Unused Virtual Network Gateway

If a Virtual Network Gateway is confirmed to have no active connections and is not required for current or future network configurations, it should be deleted to prevent ongoing charges and reduce infrastructure complexity.

### **Azure CLI**

```sh
az network vnet-gateway delete \
    --name {{gateway-name}} \
    --resource-group {{resource-group-name}}
```

### **PowerShell**

```ps
Remove-AzVirtualNetworkGateway `
    -Name "{{gateway-name}}" `
    -ResourceGroupName "{{resource-group-name}}"
```

## Considerations

- Confirm that the gateway is not reserved for planned VPN or ExpressRoute configurations.
- Ensure no virtual network or hybrid connectivity scenarios depend on the gateway being removed.
