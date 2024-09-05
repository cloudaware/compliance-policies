# Description

Ensure that all Keys in Role Based Access Control (RBAC) Azure Key Vaults have an expiration date set.

## Rationale

Azure Key Vault enables users to store and use cryptographic keys within the Microsoft Azure environment. The exp (expiration date) attribute identifies the expiration date on or after which the key MUST NOT be used for encryption of new data, wrapping of new keys, and signing. By default, keys never expire. It is thus recommended that keys be rotated in the key vault and set an explicit expiration date for all keys to help enforce the key rotation. This ensures that the keys cannot be used beyond their assigned lifetimes.

## Impact

Keys cannot be used beyond their assigned expiration dates respectively. Keys need to be rotated periodically wherever they are used.

## Audit

### From Azure Portal

1. Go to `Key vaults`.
2. For each Key vault, click on `Keys`.
3. In the main pane, ensure that an appropriate `Expiration date` is set for any keys that are `Enabled`.

### From Azure CLI

Get a list of all the key vaults in your Azure environment by running the following command:

```sh
az keyvault list
```

Then for each key vault listed ensure that the output of the below command contains Key ID (kid), enabled status as `true` and Expiration date (expires) is not empty or null:

```sh
az keyvault key list --vault-name <VaultName> --query '[*].{"kid":kid,"enabled":attributes.enabled,"expires":attributes.expires}'
```

### From PowerShell

Retrieve a list of Azure Key vaults:

```ps
Get-AzKeyVault
```

For each Key vault run the following command to determine which vaults are configured to use RBAC:

```ps
Get-AzKeyVault -VaultName <VaultName>
```

For each Key vault with the `EnableRbacAuthorizatoin` setting set to `True`, run the following command:

```ps
Get-AzKeyVaultKey -VaultName <VaultName>
```

Make sure the `Expires` setting is configured with a value as appropriate wherever the `Enabled` setting is set to `True`.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [152b15f7-8e1f-4c1f-ab71-8c010ba5dbc0](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F152b15f7-8e1f-4c1f-ab71-8c010ba5dbc0) - **Name**: `Key Vault keys should have an expiration date`

## Default Value

By default, keys do not expire.

## References

1. <https://docs.microsoft.com/en-us/azure/key-vault/key-vault-whatis>
2. <https://docs.microsoft.com/en-us/rest/api/keyvault/about-keys--secrets-and-certificates#key-vault-keys>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-data-protection#dp-6-use-a-secure-key-management-process>
4. <https://docs.microsoft.com/en-us/powershell/module/az.keyvault/set-azkeyvaultkeyattribute?view=azps-0.10.0>
