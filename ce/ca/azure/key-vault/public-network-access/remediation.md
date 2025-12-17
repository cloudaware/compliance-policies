# Remediation

## From Azure Portal

1. Go to `Key vaults`.
2. Click the name of a key vault.
3. Under `Settings`, click `Networking`.
4. Under `Firewalls and virtual networks`, next to `Allow access from:`, click the radio button next to `Disable public access`.
5. Click `Apply`.
6. Repeat steps 1-5 for each key vault requiring remediation.

## From Azure CLI

For each key vault requiring remediation, run the following command to disable public network access:

```sh
az keyvault update --resource-group <resource-group> --name <key-vault> --public-network-access Disabled
```

## From PowerShell

For each key vault requiring remediation, run the following command to disable public network access:

```ps
Update-AzKeyVault -ResourceGroupName <resource-group> -VaultName <vault-name> -PublicNetworkAccess "Disabled"
```
