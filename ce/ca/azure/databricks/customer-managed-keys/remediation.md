# Remediation

**NOTE:** These remediations assume that an Azure KeyVault already exists in the subscription.

## From Azure CLI

1. Create a dedicated key:

    ```sh
    az keyvault key create --vault-name <keyvault-name> --name <key-name> --protection <"software" or "hsm">
    ```

2. Assign permissions to Databricks:

    ```sh
    az keyvault set-policy --name <keyvault-name> --resource-group <resource-group-name> --spn <databricks-spn> --key-permissions get wrapKey unwrapKey
    ```

3. Enable encryption with CMK:

    ```sh
    az databricks workspace update --name <databricks-workspace-name> --resource-group <resource-group-name> --key-source "Microsoft.KeyVault" --key-name <key-name> --keyvault-uri <keyvault-uri>
    ```

## From PowerShell

```ps
$Key = Add-AzKeyVaultKey -VaultName <keyvault-name> -Name <key-name> -Destination <"software" or "hsm"> Set-AzDatabricksWorkspace -ResourceGroupName "<resource-group-name>" -WorkspaceName "<databricks-workspace-name>" -EncryptionKeySource "Microsoft.KeyVault" -KeyVaultUri $Key.Id
```
