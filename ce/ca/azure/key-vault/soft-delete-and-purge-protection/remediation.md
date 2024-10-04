# Remediation

To enable `Do Not Purge` and `Soft Delete` for a Key Vault:

## From Azure Portal

1. Go to `Key Vaults`.
2. For each Key Vault.
3. Click `Properties`.
4. Ensure the status of Purge protection reads `Enable purge protection (enforce a mandatory retention period for deleted vaults and vault objects)`.

    **Note**: once enabled you cannot disable it.

## From Azure CLI

```sh
az resource update --id /subscriptions/xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/resourceGroups/<resourceGroupName>/providers/Microsoft.KeyVault /vaults/<keyVaultName> --set properties.enablePurgeProtection=true
```

## From PowerShell

```ps
Update-AzKeyVault -VaultName <vaultName> -ResourceGroupName <resourceGroupName> -EnablePurgeProtection
```
