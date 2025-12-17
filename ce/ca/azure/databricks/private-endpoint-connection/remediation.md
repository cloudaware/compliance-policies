# Remediation

## From Azure Portal

1. Go to `Azure Databricks`.
2. Click the name of a workspace.
3. Under `Settings`, click `Networking`.
4. Click `Private endpoint connections`.
5. Click `+ Private endpoint`.
6. Under `Project details`, select a `Subscription` and a `Resource group`.
7. Under `Instance details`, provide a `Name`, `Network Interface Name`, and select a `Region`.
8. Click `Next : Resource }}`.
9. Select a `Target sub-resource`.
10. Click `Next : Virtual Network }}`.
11. Under `Networking`, select a `Virtual network` and a `Subnet`.
12. Optionally, configure `Private IP configuration` and `Application security group`.
13. Click `Next : DNS }}`.
14. Optionally, configure `Private DNS integration`.
15. Click `Next : Tags }}`.
16. Optionally, configure tags.
17. Click `Next : Review + create }}`.
18. Click `Create`.
19. Repeat steps 1-18 for each workspace requiring remediation.

## From Azure CLI

For each workspace requiring remediation, run the following command to create a private endpoint connection:

```sh
az network private-endpoint create /
    --resource-group {{resource-group}} /
    --name {{private-endpoint}} /
    --location {{location}} /
    --vnet-name {{virtual-network}} /
    --subnet {{subnet}} /
    --private-connection-resource-id {{workspace}} /
    --connection-name {{private-endpoint-connection}} /
    --group-id {{browser_authentication| databricks_ui_api}}
```
