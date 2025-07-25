# Remediation

## From Azure Portal

Key Vaults can be configured to use `Azure role-based access control` on creation.

For existing Key Vaults:

1. From Azure Home open the Portal Menu in the top left corner
2. Select `Key Vaults`
3. Select a Key Vault to audit
4. Select `Networking`
5. NEXT

## From Azure CLI

To disable Public network access for each Key Vault, run the following Azure CLI command:

```sh
az keyvault update --resource-group <resource_group> --name <vault_name> --public-network-access Disabled
```

## From PowerShell

To enable RBAC authorization on each Key Vault, run the following PowerShell command:

```ps
Update-AzKeyVault -ResourceGroupName <resource_group> -VaultName <vault_name> -PublicNetworkAccess "Disabled"
```
