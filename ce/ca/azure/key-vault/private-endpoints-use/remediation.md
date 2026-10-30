# Remediation

**Please see the additional information about the requirements needed before starting this remediation procedure.**

## From Azure Portal

1. In the Azure portal, open the portal menu in the upper-left corner.
2. Select `Key Vaults`.
3. Select a Key Vault to configure.
4. Select `Networking` in the left column.
5. Select `Private endpoint connections` from the top row.
6. Select `+ Create`.
7. Select the subscription the Key Vault is in, and any other configuration options.
8. Select `Next`.
9. For resource type, select `Microsoft.KeyVault/vaults`.
10. Select the Key Vault to associate the Private Endpoint with.
11. Select `Next`.
12. In the `Virtual Networking` field, select the network to assign to the endpoint.
13. Select other configuration options as desired, including an existing or new application security group.
14. Select `Next`.
15. Select the private DNS that the private endpoint will use.
16. Select `Next`.
17. Optionally add `Tags`.
18. Select `Next: Review + Create`.
19. Review the information and select `Create`. Follow the Audit procedure to verify that the configuration applied successfully.
20. Repeat steps 3-19 for each Key Vault.

## From Azure CLI

1. To create an endpoint, run the following command:

    ```sh
    az network private-endpoint create \
        --resource-group {{resource-group-name}} \
        --vnet-name {{vnet-name}} \
        --subnet {{subnet-name}} \
        --name {{private-endpoint-name}} \
        --private-connection-resource-id "/subscriptions/{{azure-subscription-id}}/resourceGroups/{{resource-group-name}}/providers/Microsoft.KeyVault/vaults/{{key-vault-name}}" \
        --group-ids vault \
        --connection-name {{private-link-connection-name}} \
        --location {{azure-region}} \
        --manual-request

    ```

2. To manually approve the endpoint request, run the following command:

    ```sh
    az keyvault private-endpoint-connection approve \
        --resource-group {{resource-group-name}} \
        --vault-name {{key-vault-name}} \
        --name {{private-link-name}}
    ```

3. Determine the Private Endpoint's IP address to connect the Key Vault to the Private DNS you have previously created.
4. Look for the `networkInterfaces` property, then `id`. Use that value as `privateEndpointNIC` in step 6:

    ```sh
    az network private-endpoint show \
        -g {{resource-group-name}} \
        -n {{private-endpoint-name}}
    ```

5. Use the NIC ID to query the private IP address:

    ```sh
    az network nic show --ids {{private-endpoint-nic-id}}
    ```

6. Create a Private DNS record within the DNS Zone you created for the Private Endpoint:

    ```sh
    az network private-dns record-set a add-record \
        -g {{resource-group-name}} \
        -z "privatelink.vaultcore.azure.net" \
        -n {{key-vault-name}} \
        -a {{private-endpoint-nic}}
    ```

7. Run `nslookup` for the private endpoint to verify the DNS record:

    ```sh
    nslookup {{key-vault-name}}.vault.azure.net
    nslookup {{key-vault-name}}.privatelink.vaultcore.azure.net
    ```
