# Description

Azure Key Vault stores multiple types of sensitive information such as encryption keys, certificate thumbprints, and managed identity credentials. Access to these secrets can be controlled through granular permissions.

## Rationale

The credentials given to an application have permissions to create, delete, or modify data stored within the systems they access. If these credentials are stored within the application itself, anyone with access to the application or a copy of the code has access to them. Storing them in Azure Key Vault as secrets increases security by controlling access. This also allows credential updates without redeploying the entire application.

## Impact

References to Key Vault secrets must be integrated into the application code. This requires additional configuration during application development or refactoring of an existing application. There are also additional costs charged per 10,000 requests to Key Vault.

## Audit

### From Azure Portal

1. Log in to the Azure portal.
2. In the left navigation pane, go to `Key Vaults`.
3. View the Key Vaults listed.

### From PowerShell

To list Key Vaults within a subscription, run the following command:

```ps
Get-AzKeyVault
```

To list all secrets in a Key Vault, run the following command:

```ps
Get-AzKeyVaultSecret -VaultName '{{vault-name}}'
```

## Default Value

By default, no Azure Key Vaults are created.

## References

1. <https://docs.microsoft.com/en-us/azure/app-service/app-service-key-vault-references>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-identity-management#im-3-manage-application-identities-securely-and-automatically>
3. <https://docs.microsoft.com/en-us/cli/azure/keyvault?view=azure-cli-latest>
4. <https://docs.microsoft.com/en-us/cli/azure/keyvault?view=azure-cli-latest>
