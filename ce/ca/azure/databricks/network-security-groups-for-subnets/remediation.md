# Remediation

## Assign an NSG to an Existing Databricks Subnet

### Azure CLI

1. **Create an NSG (if one does not already exist)**

    ```sh
    az network nsg create \
        --resource-group {{resource-group}} \
        --name {{nsg-name}} \
        --location {{location}}
    ```

2. **Associate the NSG with the Databricks subnet**

    ```sh
    az network vnet subnet update \
        --resource-group {{resource-group}} \
        --vnet-name {{vnet-name}} \
        --name {{databricks-subnet-name}} \
        --network-security-group {{nsg-name}}
    ```

Repeat this step for both the private and public Databricks subnets, if applicable.

### From PowerShell

```ps
$sampleRule = New-AzNetworkSecurityRuleConfig `
    -Name {{rdp-rule}}`
    -Description "Allow RDP" `
    -Access Allow `
    -Protocol Tcp `
    -Direction Inbound `
    -Priority 100 `
    -SourceAddressPrefix Internet `
    -SourcePortRange * `
    -DestinationAddressPrefix * `
    -DestinationPortRange 3389

$nsg = New-AzNetworkSecurityGroup `
    -Name "{{nsg-name}}" `
    -ResourceGroupName "{{resource-group}}" `
    -Location "{{location}}" `
    -SecurityRules $rdpRule

$vnet = Get-AzVirtualNetwork `
    -Name "{{databricks-vnet-name}}" `
    -ResourceGroupName "{{resource-group}}"

Set-AzVirtualNetworkSubnetConfig 
    -Name  {{subnet-name}}
    -VirtualNetwork $vnet 
    -NetworkSecurityGroupId $nsg.Id

$vnet | Set-AzVirtualNetwork
```

> NSG rule definitions must follow Azure Databricks networking requirements.
