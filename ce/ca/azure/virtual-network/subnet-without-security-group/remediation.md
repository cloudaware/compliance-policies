# Remediation

## From Azure Portal

1. Go to `Virtual networks`.
2. Click the name of a virtual network.
3. Under `Settings`, click `Subnets`.
4. Click the name of a subnet.
5. Under `Security`, next to `Network security group`, click `None` to display the drop-down menu.
6. Select a network security group.
7. Click `Save`.
8. Repeat steps 1-7 for each virtual network and subnet requiring remediation.

## From Azure CLI

For each subnet requiring remediation, run the following command to associate it with a network security group:

``` sh
az network vnet subnet update /
    --resource-group {{resource-group}} /
    --vnet-name {{virtual-network}} /
    --name {{subnet}} /
    --network-security-group {{network-security-group}}
```
