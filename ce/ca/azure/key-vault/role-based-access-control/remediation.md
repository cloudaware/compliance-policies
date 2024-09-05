# Remediation

## From Azure Portal

Key Vaults can be configured to use `Azure role-based access control` on creation.

For existing Key Vaults:

1. From Azure Home open the Portal Menu in the top left corner.
2. Select `Key Vaults`.
3. Select a Key Vault to audit.
4. Select `Access configuration`.
5. Set the Permission model radio button to `Azure role-based access control`, taking note of the warning message.
6. Click `Save`.
7. Select `Access Control (IAM)`.
8. Select the `Role Assignments` tab.
9. Reapply permissions as needed to groups or users.

## From Azure CLI

To enable RBAC Authorization for each Key Vault, run the following Azure CLI command:

```sh
az keyvault update --resource-group <RESOURCE GROUP NAME> --name <KEY VAULT NAME> --enable-rbac-authorization true
```

## From PowerShell

To enable RBAC authorization on each Key Vault, run the following PowerShell command:

```ps
Update-AzKeyVault -ResourceGroupName <RESOURCE GROUP NAME> -VaultName <KEY VAULT NAME> -EnableRbacAuthorization $True
```
