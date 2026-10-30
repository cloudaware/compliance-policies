# Remediation

## From Azure Portal

1. Go to `Key Vaults`.
2. For each Key Vault, select `Secrets`.
3. In the main pane, ensure that the status of the secret is `Enabled`.
4. Set an appropriate `Expiration date` on all secrets.

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

1. Go to the Key Vault and select `Access policies`.
2. Click on `Create` and add an access policy with the `Update` permission (in the Secret Permissions - Secret Management Operations section).

## From PowerShell

For each Key Vault with the `EnableRbacAuthorization` setting set to `False` or empty, run the following command:

```ps
Set-AzKeyVaultSecret `
    -VaultName {{vault-name}} `
    -Name {{secret-name}} `
    -Expires {{date-time}}
```
