# Description

Ensure that all Secrets in Role Based Access Control (RBAC) Azure Key Vaults have an expiration date set.

## Rationale

The Azure Key Vault enables users to store and keep secrets within the Microsoft Azure environment. Secrets in the Azure Key Vault are octet sequences with a maximum size of 25k bytes each. The exp (expiration date) attribute identifies the expiration date on or after which the secret MUST NOT be used. By default, secrets never expire. It is thus recommended to rotate secrets in the key vault and set an explicit expiration date for all secrets. This ensures that the secrets cannot be used beyond their assigned lifetimes.

## Impact

Secrets cannot be used beyond their assigned expiry date respectively. Secrets need to be rotated periodically wherever they are used.

## Audit

This policy flags an *Azure Key Vault* as `INCOMPLIANT` if any of the related *Azure Key Vault Secret* has an **empty** `Expiration Date`.

A *Key Vault* is marked as `INAPPLICABLE` if `RBAC Authorization` is set to **Disabled**.

## Default Value

By default, secrets do not expire.

## References

1. <https://learn.microsoft.com/en-us/azure/key-vault/general/basic-concepts>
2. <https://learn.microsoft.com/en-us/azure/key-vault/general/about-keys-secrets-certificates>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-data-protection#dp-6-use-a-secure-key-management-process>
4. <https://learn.microsoft.com/en-us/powershell/module/az.keyvault/set-azkeyvaultsecretattribute>
