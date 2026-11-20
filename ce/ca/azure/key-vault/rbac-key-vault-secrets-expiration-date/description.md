# Description

Ensure that all secrets in role-based access control (RBAC) Azure Key Vaults have an expiration date set.

## Rationale

The Azure Key Vault enables users to store and keep secrets within the Microsoft Azure environment. Secrets in the Azure Key Vault are octet sequences with a maximum size of 25k bytes each. The `exp` (expiration date) attribute identifies the expiration date on or after which the secret MUST NOT be used. By default, secrets never expire. It is recommended to rotate secrets in the Key Vault and set an explicit expiration date for all secrets. This ensures that the secrets cannot be used beyond their assigned lifetimes.

## Impact

Secrets cannot be used beyond their assigned expiration dates. Secrets must be rotated periodically wherever they are used.

## Audit

This policy marks an *Azure Key Vault* as `INCOMPLIANT` if a current enabled secret has no `Expiration Date`.

The policy applies to authorization mode **Enabled**. A vault is `COMPLIANT` when at least one current enabled secret is assessed and all current enabled secrets have an expiration date. Vaults using mode **Disabled** or containing only current disabled secrets are `INAPPLICABLE`.

An empty collected secret list is `UNDETERMINED` because absence and incomplete collection cannot be distinguished.

## Default Value

By default, secrets do not expire.

## References

1. <https://learn.microsoft.com/en-us/azure/key-vault/general/basic-concepts>
2. <https://learn.microsoft.com/en-us/azure/key-vault/general/about-keys-secrets-certificates>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-data-protection#dp-6-use-a-secure-key-management-process>
4. <https://learn.microsoft.com/en-us/powershell/module/az.keyvault/set-azkeyvaultsecretattribute>
