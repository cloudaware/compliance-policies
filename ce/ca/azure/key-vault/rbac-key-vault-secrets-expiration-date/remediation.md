# Remediation

## From Azure Portal

1. Go to `Key Vaults`.
2. For each Key Vault, select `Secrets`.
3. In the main pane, ensure that the status of the secret is `Enabled`.
4. For each enabled secret, ensure that an appropriate `Expiration date` is set.

## From Azure CLI

Update the `Expiration date` for the secret using the following command. Use a UTC timestamp in ISO 8601 format.

```sh
az keyvault secret set-attributes \
    --name {{secret-name}} \
    --vault-name {{vault-name}} \
    --expires {{expiration-date-time-utc}}
```

**Note**: To view the expiration date on all secrets in a Key Vault using Microsoft API, the `List` permission for secrets is required.

To update the expiration date for the secrets:

1. Go to the Key Vault and select `Access Control (IAM)`.
2. Select `Add role assignment` and assign the `Key Vault Secrets Officer` role to the appropriate user.

## From PowerShell

```ps
Set-AzKeyVaultSecretAttribute `
    -VaultName {{vault-name}} `
    -Name {{secret-name}} `
    -Expires {{date-time}}
```
