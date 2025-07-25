# Description

Ensure that all Keys in Role Based Access Control (RBAC) Azure Key Vaults have an expiration date set.

## Rationale

Azure Key Vault enables users to store and use cryptographic keys within the Microsoft Azure environment. The exp (expiration date) attribute identifies the expiration date on or after which the key MUST NOT be used for encryption of new data, wrapping of new keys, and signing. By default, keys never expire. It is thus recommended that keys be rotated in the key vault and set an explicit expiration date for all keys to help enforce the key rotation. This ensures that the keys cannot be used beyond their assigned lifetimes.

## Impact

Keys cannot be used beyond their assigned expiration dates respectively. Keys need to be rotated periodically wherever they are used.

## Audit

This policy flags an *Azure Key Vault* as `INCOMPLIANT` if any of the related *Azure Key Vault Keys* has an **empty** `Expiration Date`.

A *Key Vault* is marked as `INAPPLICABLE` if `RBAC Authorization` is set to **Disabled**.

## Default Value

By default, keys do not expire.

## References

1. <https://docs.microsoft.com/en-us/azure/key-vault/key-vault-whatis>
2. <https://docs.microsoft.com/en-us/rest/api/keyvault/about-keys--secrets-and-certificates#key-vault-keys>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-data-protection#dp-6-use-a-secure-key-management-process>
4. <https://docs.microsoft.com/en-us/powershell/module/az.keyvault/set-azkeyvaultkeyattribute?view=azps-0.10.0>
