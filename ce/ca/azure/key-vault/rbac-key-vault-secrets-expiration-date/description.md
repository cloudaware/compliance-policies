# Description

Ensure that all Secrets in Role Based Access Control (RBAC) Azure Key Vaults have an expiration date set.

## Rationale

The Azure Key Vault enables users to store and keep secrets within the Microsoft Azure environment. Secrets in the Azure Key Vault are octet sequences with a maximum size of 25k bytes each. The exp (expiration date) attribute identifies the expiration date on or after which the secret MUST NOT be used. By default, secrets never expire. It is thus recommended to rotate secrets in the key vault and set an explicit expiration date for all secrets. This ensures that the secrets cannot be used beyond their assigned lifetimes.

## Impact

Secrets cannot be used beyond their assigned expiry date respectively. Secrets need to be rotated periodically wherever they are used.

## Audit

### From Azure Portal

1. Go to `Key vaults`.
2. For each Key vault, click on `Secrets.`.
3. In the main pane, ensure that the status of the secret is `Enabled`.
4. For each enabled secret, ensure that an appropriate `Expiration date` is set.

### From Azure CLI

Ensure that the output of the below command contains ID (id), enabled status as `true` and Expiration date (expires) is not empty or null:

```sh
az keyvault secret list --vault-name <KEYVAULTNAME> --query '[*].{"kid":kid,"enabled":attributes.enabled,"expires":attributes.expires}'
```

### From PowerShell

Retrieve a list of Key vaults:

```ps
Get-AzKeyVault
```

For each Key vault, run the following command to determine which vaults are configured to use RBAC:

```ps
Get-AzKeyVault -VaultName <Vault Name>
```

For each Key vault with the `EnableRbacAuthorizatoin` setting set to `True`, run the following command:

```ps
Get-AzKeyVaultSecret -VaultName <Vault Name>
```

Make sure the `Expires` setting is configured with a value as appropriate wherever the `Enabled` setting is set to `True`.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [98728c90-32c7-4049-8429-847dc0f4fe37](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F98728c90-32c7-4049-8429-847dc0f4fe37) - **Name**: `Key Vault secrets should have an expiration date`

## Default Value

By default, secrets do not expire.

## References

1. <https://docs.microsoft.com/en-us/azure/key-vault/key-vault-whatis>
2. <https://docs.microsoft.com/en-us/rest/api/keyvault/about-keys--secrets-and-certificates#key-vault-secrets>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-data-protection#dp-6-use-a-secure-key-management-process>
4. <https://docs.microsoft.com/en-us/powershell/module/az.keyvault/set-azkeyvaultsecretattribute?view=azps-0.10.0>
