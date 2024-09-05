# Description

Azure Key Vault will store multiple types of sensitive information such as encryption keys, certificate thumbprints, and Managed Identity Credentials. Access to these 'Secrets' can be controlled through granular permissions.

## Rationale

The credentials given to an application have permissions to create, delete, or modify data stored within the systems they access. If these credentials are stored within the application itself, anyone with access to the application or a copy of the code has access to them. Storing within Azure Key Vault as secrets increases security by controlling access. This also allows for updates of the credentials without redeploying the entire application.

## Impact

Integrating references to secrets within the key vault are required to be specifically integrated within the application code. This will require additional configuration to be made during the writing of an application, or refactoring of an already written one. There are also additional costs that are charged per 10000 requests to the Key Vault.

## Audit

### From Azure Portal

1. Login to Azure Portal.
2. In the expandable menu on the left go to `Key Vaults`.
3. View the Key Vaults listed.

### From Powershell

To list key vaults within a subscription run the following command:

```ps
Get-AzKeyVault
```

To list all secrets in a key vault run the following command:

```ps
Get-AzKeyVaultSecret -VaultName '<vaultName>'
```

## Default Value

By default, no Azure Key Vaults are created.

## References

1. <https://docs.microsoft.com/en-us/azure/app-service/app-service-key-vault-references>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-identity-management#im-3-manage-application-identities-securely-and-automatically>
3. <https://docs.microsoft.com/en-us/cli/azure/keyvault?view=azure-cli-latest>
4. <https://docs.microsoft.com/en-us/cli/azure/keyvault?view=azure-cli-latest>
