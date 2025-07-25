# Remediation

## From Azure Portal

1. Delete the existing Databricks workspace (migration required).
2. Create a new Databricks workspace with VNet Injection:
3. Go to Azure Portal → Create Databricks Workspace.
4. Select Advanced Networking.
5. Choose Deploy into your own Virtual Network.
6. Specify a customer-managed VNet and associated subnets.
7. Enable Private Link for secure API access.

### From Azure CLI

Deploy a new Databricks workspace in a custom VNet:

```sh
az databricks workspace create --name <databricks-workspace-name> \ 
    --resource-group <resource-group-name> \ 
    --location <region> \ 
    --managed-resource-group <managed-rg-name> \ 
    --enable-no-public-ip true \ 
    --network-security-group-rule "NoAzureServices" \ 
    --public-network-access Disabled \ 
    --custom-virtual-network-id /subscriptions/<subscription-id>/resourceGroups/<resource-group-name>/providers/Microsoft.Network/virtualNetworks/<vnet-name>
```

Ensure NSG Rules are correctly configured:

```sh
az network nsg rule create --resource-group <resource-group-name> \ 
    --nsg-name <nsg-name> \ 
    --name "DenyAllOutbound" \ 
    --direction Outbound \ 
    --access Deny \ 
    --priority 4096
```

## From PowerShell

```ps
New-AzDatabricksWorkspace -ResourceGroupName <resource-group-name> -Name <databricks-workspace-name> -Location <region> -ManagedResourceGroupName <managed-rg-name> -CustomVirtualNetworkId "/subscriptions/<subscription-id>/resourceGroups/<resource-group-name>/providers/Microsoft.Network/virtualNetworks/<vnet-name>"
```
