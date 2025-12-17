# Remediation

**Note:** Once enabled, purge protection cannot be disabled.

## From Azure Portal

1. Go to `Key Vaults`.
2. Click the name of a key vault.
3. Under `Settings`, click `Properties`.
4. Select the radio button next to `Enable purge protection (enforce a mandatory retention period for deleted vaults and vault objects)`.
5. Click `Save`.
6. Repeat steps 1-5 for each key vault requiring remediation.

## From Azure CLI

For each key vault requiring remediation, run the following command to enable purge protection:

```sh
az resource update --resource-group <resource-group> --name <key-vault> --resource-type "Microsoft.KeyVault/vaults" --set properties.enablePurgeProtection=true
```

## From PowerShell

For each key vault requiring remediation, run the following command to enable purge protection:

```ps
Update-AzKeyVault -ResourceGroupName <resource-group> -VaultName <key-vault> -EnablePurgeProtection
```
