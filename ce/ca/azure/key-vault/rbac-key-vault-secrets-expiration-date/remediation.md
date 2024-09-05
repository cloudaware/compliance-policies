# Remediation

## From Azure Portal

1. Go to `Key vaults`.
2. For each Key vault, click on `Secrets`.
3. In the main pane, ensure that the status of the secret is `Enabled`.
4. For each enabled secret, ensure that an appropriate `Expiration date` is set.

## From Azure CLI

Update the `Expiration date` for the secret using the below command:

```sh
az keyvault secret set-attributes --name <secretName> --vault-name <vaultName> --expires Y-m-d'T'H:M:S'Z'
```

**Note**: To view the expiration date on all secrets in a Key Vault using Microsoft API, the `List Key` permission is required.

To update the expiration date for the secrets:

1. Go to the Key vault, click on `Access Control (IAM)`.
2. Click on `Add role assignment` and assign the role of `Key Vault Secrets Officer` to the appropriate user.

## From PowerShell

```ps
Set-AzKeyVaultSecretAttribute -VaultName <Vault Name> -Name <Secret Name> -Expires <DateTime>
```
