# Remediation

## From Azure Portal

1. Go to `Key vaults`.
2. For each Key vault, click on `Secrets`.
3. In the main pane, ensure that the status of the secret is `Enabled`.
4. Set an appropriate `Expiration dat`e on all secrets.

## From Azure CLI

Update the `Expiration date` for the secret using the below command:

```sh
az keyvault secret set-attributes --name <secretName> --vault-name <vaultName> --expires Y-m-d'T'H:M:S'Z'
```

**Note**: To view the expiration date on all secrets in a Key Vault using Microsoft API, the `List Key` permission is required.

To update the expiration date for the secrets:

1. Go to Key vault, click on `Access policies`.
2. Click on `Create` and add an access policy with the Update permission (in the Secret Permissions - Secret Management Operations section).

## From PowerShell

For each Key vault with the `EnableRbacAuthorization` setting set to `False` or empty, run the following command;

```ps
Set-AzKeyVaultSecret -VaultName <Vault Name> -Name <Secret Name> -Expires <DateTime>
```
