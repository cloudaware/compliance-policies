# Remediation

## Redeploy Azure Databricks into a Custom VNet with NSGs

This **requires recreating the Databricks workspace** using VNet injection.

### Azure CLI

1. **Create an NSG**

    ```sh
    az network nsg create \
        --resource-group {{resource-group}} \
        --name {{nsg-name}} \
        --location {{location}}
    ```

2. **Create a custom Virtual Network and subnets**

    ```sh
    az network vnet create \
        --resource-group {{resource-group}} \
        --name {{vnet-name}} \
        --address-prefix {{10.0.0.0/16}} \
        --subnets "[{name:{{private-subnet-name}},address-prefix:{{subnet-prefix}}},{name:{{public-subnet-name}},address-prefix:{{subnet-prefix}} }]" \
        --nsg {{nsg-name}}
    ```

3. **Deploy a new Databricks workspace using VNet injection**

    ```sh
    az databricks workspace create \
        --resource-group {{resource-group}} \
        --name {{workspace-name}} \
        --location {{location}} \
        --sku {{premium}} \
        --vnet {{vnet-name}} \
        --public-subnet {{public-subnet-name}} \
        --private-subnet {{private-subnet-name}}
    ```

### Notes

* This remediation may require downtime and workload migration.
* Subnet address ranges must meet Azure Databricks sizing requirements.
