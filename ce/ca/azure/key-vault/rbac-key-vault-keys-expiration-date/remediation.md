# Remediation

## From Azure Portal

1. Go to `Key vaults`.
2. For each Key vault, click on `Keys`.
3. In the main pane, ensure that an appropriate `Expiration date` is set for any keys that are `Enabled`.

## From Azure CLI

Update the `Expiration date` for the key using the below command:

```sh
az keyvault key set-attributes --name <keyName> --vault-name <vaultName> --expires Y-m-d'T'H:M:S'Z'
```

**Note**: To view the expiration date on all keys in a Key Vault using Microsoft API, the `List Key` permission is required.

To update the expiration date for the keys:

1. Go to the Key vault, click on Access Control (IAM).
2. Click on Add role assignment and assign the role of Key Vault Crypto Officer to the appropriate user.

## From PowerShell

```ps
Set-AzKeyVaultKeyAttribute -VaultName <VaultName> -Name <KeyName> -Expires <DateTime>
```
