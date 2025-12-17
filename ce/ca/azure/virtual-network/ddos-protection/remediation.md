# Remediation

## **Azure Portal**

1. Go to `Virtual networks`.
2. Click the name of a virtual network.
3. Under `Settings`, click `DDoS protection`.
4. Next to `DDoS Network Protection`, click `Enable`.
5. Provide a DDoS protection plan resource ID, or select a DDoS protection plan from the drop-down menu.
6. Click `Save`.
7. Repeat steps 1-6 for each virtual network requiring remediation.

### **Azure CLI**

For each virtual network requiring remediation, run the following command to enable DDoS protection:

    ```sh
    az network vnet update --resource-group <resource-group> --name <virtual-network> --ddos-protection true --ddos-protection-plan <ddos-protection-plan>
    ```
