# Remediation

## From Azure Portal

1. Go to `Key Vaults`.
2. For each Key Vault, select `Keys`.
3. In the main pane, ensure that the status of the key is `Enabled`.
4. For each enabled key, ensure that an appropriate `Expiration date` is set.

## From Azure CLI

Update the expiration date for the key using the following command. Use a UTC timestamp in ISO 8601 format.

```sh
az keyvault key set-attributes \
    --name {{key-name}} \
    --vault-name {{vault-name}} \
    --expires {{expiration-date-time-utc}}
```

**Note**: To view the expiration date on all keys in a Key Vault using Microsoft API, the `List Key` permission is required.

To update the expiration date for the keys:

1. Go to the Key Vault and select `Access policies`.
2. Click on `Create` and add an access policy with the `Update` permission (in the Key Permissions - Key Management Operations section).

## From PowerShell

```ps
Set-AzKeyVaultKeyAttribute `
    -VaultName {{vault-name}} `
    -Name {{key-name}} `
    -Expires {{date-time}}
```
