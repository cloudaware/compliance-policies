# Remediation

## From Azure Portal

1. Go to `Key vaults`.
2. For each Key vault, click on `Keys`.
3. In the main pane, ensure that the status of the key is `Enabled`.
4. For each enabled key, ensure that an appropriate `Expiration date` is set.

## From Azure CLI

Update the Expiration date for the key using the below command:

```sh
az keyvault key set-attributes --name <keyName> --vault-name <vaultName> --expires Y-m-d'T'H:M:S'Z'
```

**Note**: To view the expiration date on all keys in a Key Vault using Microsoft API, the `List Key` permission is required.

To update the expiration date for the keys:

1. Go to Key vault, click on `Access policies`.
2. Click on `Create` and add an access policy with the `Update` permission (in the Key Permissions - Key Management Operations section).

## From PowerShell

```ps
Set-AzKeyVaultKeyAttribute -VaultName <Vault Name> -Name <Key Name> -Expires <DateTime>
```
