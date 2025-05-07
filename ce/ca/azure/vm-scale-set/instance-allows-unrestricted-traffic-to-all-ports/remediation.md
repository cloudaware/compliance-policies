# Remediation

## Modify or Remove Insecure NSG Rule

Review the security rules associated with the relevant Network Security Group (NSG) and determine whether they are required. Take appropriate action based on necessity and scope:

- **If the rule is not required**: Remove the rule entirely.

- **If the rule is required but overly permissive**: Update the rule to narrowly scope access, restricting the destination port and/or source IP ranges to only what is strictly necessary.

### Azure CLI

1. **Delete the rule:**

    ```sh
    az network nsg rule delete \
      --resource-group {{resource-group-name}} \
      --nsg-name {{nsg-name}} \
      --name {{rule-name}}
    ```

2. **Restrict the rule:**

    ```sh
    az network nsg rule update \
        --resource-group {{resource-group-name}} \
        --nsg-name {{nsg-name}} \
        --name {{rule-name}} \
        --destination-port-ranges {{specific-ports}} \
        --source-address-prefixes {{trusted-cidr}} 
    ```

    Replace placeholders with the appropriate values. Use space-separated values for multiple source prefixes or destination ports (e.g., `--destination-port-ranges "80 443"` or `--source-address-prefixes "1.2.3.4/32 5.6.7.8/32"`).

### PowerShell

1. **Delete the rule:**

    ```ps
    $nsg = Get-AzNetworkSecurityGroup `
        -ResourceGroupName "{{resource-group-name}}" `
        -Name "{{nsg-name}}"

    Remove-AzNetworkSecurityRuleConfig `
        -Name "{{rule-name}}" `
        -NetworkSecurityGroup $nsg

    Set-AzNetworkSecurityGroup -NetworkSecurityGroup $nsg
    ```

    First, retrieve the NSG object: `$nsg`. Then use `$nsg` object in `Remove-AzNetworkSecurityRuleConfig` and `Set-AzNetworkSecurityGroup`.

2. **Restrict the rule:**

    ```ps
    $nsg = Get-AzNetworkSecurityGroup `
        -ResourceGroupName "{{resource-group-name}}" `
        -Name "{{nsg-name}}"

    $rule = $nsg.SecurityRules | Where-Object { $_.Name -eq "{{rule-name}}" }

    $rule.DestinationPortRange = "{{specific-ports}}" # Replace with your desired port
    $rule.SourceAddressPrefix = "{{trusted-cidr}}" # Replace with your source IP/CIDR

    Set-AzNetworkSecurityRuleConfig `
        -NetworkSecurityGroup $nsg `
        -Name $rule.Name `
        -Direction $rule.Direction `
        -Priority $rule.Priority `
        -Access $rule.Access `
        -Protocol $rule.Protocol `
        -SourceAddressPrefix $rule.SourceAddressPrefix `
        -SourcePortRange $rule.SourcePortRange `
        -DestinationAddressPrefix $rule.DestinationAddressPrefix `
        -DestinationPortRange $rule.DestinationPortRange

    Set-AzNetworkSecurityGroup -NetworkSecurityGroup $nsg

    ```

**Note**: Always validate changes through the Azure portal, CLI, or PowerShell to ensure that unrestricted access is effectively removed and that intended functionality remains intact.
