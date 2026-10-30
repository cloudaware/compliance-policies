# Remediation

**Note:** These remediations assume that an Azure Key Vault already exists in the subscription.

## From Azure CLI

1. Create a dedicated key:

    ```sh
    az keyvault key create --vault-name {{key-vault-name}} --name {{key-name}} --protection {{key-protection-type}}
    ```

2. Assign permissions to Databricks:

    ```sh
    az keyvault set-policy \
        --name {{key-vault-name}} \
        --resource-group {{resource-group-name}} \
        --spn {{databricks-spn}} \
        --key-permissions get wrapKey unwrapKey
    ```

3. Enable encryption with CMK:

    ```sh
    az databricks workspace update \
        --name {{databricks-workspace-name}} \
        --resource-group {{resource-group-name}} \
        --key-source "Microsoft.KeyVault" \
        --key-name {{key-name}} \
        --keyvault-uri {{key-vault-uri}}
    ```

## From PowerShell

```ps
$key = Add-AzKeyVaultKey `
    -VaultName {{key-vault-name}} `
    -Name {{key-name}} `
    -Destination {{key-protection-type}}

Set-AzDatabricksWorkspace `
    -ResourceGroupName "{{resource-group-name}}" `
    -WorkspaceName "{{databricks-workspace-name}}" `
    -EncryptionKeySource "Microsoft.KeyVault" `
    -KeyVaultUri $key.Id
```
