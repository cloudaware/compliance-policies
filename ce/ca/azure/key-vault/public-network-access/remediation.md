# Remediation

## From Azure Portal

1. Go to `Key Vaults`.
2. Click the name of a Key Vault.
3. Under `Settings`, click `Networking`.
4. Under `Firewalls and virtual networks`, next to `Allow access from:`, click the radio button next to `Disable public access`.
5. Click `Apply`.
6. Repeat steps 1-5 for each Key Vault requiring remediation.

## From Azure CLI

For each Key Vault requiring remediation, run the following command to disable public network access:

```sh
az keyvault update \
    --resource-group {{resource-group-name}} \
    --name {{key-vault-name}} \
    --public-network-access Disabled
```

## From PowerShell

For each Key Vault requiring remediation, run the following command to disable public network access:

```ps
Update-AzKeyVault `
    -ResourceGroupName {{resource-group-name}} `
    -VaultName {{key-vault-name}} `
    -PublicNetworkAccess "Disabled"
```
