# Description

Ensure that all Keys in Non Role Based Access Control (RBAC) Azure Key Vaults have an expiration date set.

## Rationale

Azure Key Vault enables users to store and use cryptographic keys within the Microsoft Azure environment. The exp (expiration date) attribute identifies the expiration date on or after which the key MUST NOT be used for a cryptographic operation. By default, keys never expire. It is thus recommended that keys be rotated in the key vault and set an explicit expiration date for all keys. This ensures that the keys cannot be used beyond their assigned lifetimes.

## Impact

Keys cannot be used beyond their assigned expiration dates respectively. Keys need to be rotated periodically wherever they are used.

## Audit

### From Azure Portal

1. Go to `Key vaults`.
2. For each Key vault, click on `Keys`.
3. In the main pane, ensure that the status of the key is `Enabled`.
4. For each enabled key, ensure that an appropriate `Expiration date` is set.

### From Azure CLI

Get a list of all the key vaults in your Azure environment by running the following command:

```sh
az keyvault list
```

For each key vault, ensure that the output of the below command contains Key ID (kid), enabled status as `true` and Expiration date (expires) is not empty or null:

```sh
az keyvault key list --vault-name <KEYVAULTNAME> --query '[*].{"kid":kid,"enabled":attributes.enabled,"expires":attributes.expires}'
```

### From PowerShell

```ps
Retrieve a list of Azure Key vaults: Get-AzKeyVault
```

For each Key vault, run the following command to determine which vaults are configured to not use RBAC:

```ps
Get-AzKeyVault -VaultName <Vault Name>
```

For each Key vault with the `EnableRbacAuthorizatoin` setting set to `False` or empty, run the following command:

```ps
Get-AzKeyVaultKey -VaultName <Vault Name>
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
