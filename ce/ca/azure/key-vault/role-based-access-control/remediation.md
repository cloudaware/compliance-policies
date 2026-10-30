# Remediation

## From Azure Portal

Key Vaults can be configured to use `Azure role-based access control` at creation.

For existing Key Vaults:

1. In the Azure portal, open the portal menu in the upper-left corner.
2. Select `Key Vaults`.
3. Select a Key Vault to configure.
4. Select `Access configuration`.
5. Set the permission model radio button to `Azure role-based access control`, taking note of the warning message.
6. Click `Save`.
7. Select `Access Control (IAM)`.
8. Select the `Role Assignments` tab.
9. Reapply permissions as needed for groups or users.

## From Azure CLI

To enable RBAC Authorization for each Key Vault, run the following Azure CLI command:

```sh
az keyvault update \
    --resource-group {{resource-group-name}} \
    --name {{key-vault-name}} \
    --enable-rbac-authorization true
```

## From PowerShell

To enable RBAC authorization on each Key Vault, run the following PowerShell command:

```ps
Update-AzKeyVault `
    -ResourceGroupName {{resource-group-name}} `
    -VaultName {{key-vault-name}} `
    -EnableRbacAuthorization $True
```
