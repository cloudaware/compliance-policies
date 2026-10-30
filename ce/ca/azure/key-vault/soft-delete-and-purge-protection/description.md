# Description

Key Vaults contain object keys, secrets, and certificates. Deletion of a Key Vault can cause immediate data loss or loss of security functions (authentication, validation, verification, non-repudiation, etc.) supported by the Key Vault objects.

It is recommended that the Key Vault be made recoverable by enabling the "purge protection" function. This prevents the loss of encrypted data, including storage accounts, SQL databases, and dependent services provided by Key Vault objects (keys, secrets, certificates, etc.).

**Note**: In February 2025, Microsoft enabled soft delete protection on all Key Vaults. Users can no longer opt out of or turn off soft delete.

**WARNING**: A current limitation is that role assignments disappear when a Key Vault is deleted. All role assignments must be recreated after recovery.

## Rationale

Users may accidentally run delete or purge commands on a Key Vault, or an attacker or malicious user may do so deliberately to cause disruption. Deleting or purging a Key Vault leads to immediate data loss, as keys encrypting data and secrets or certificates allowing access to services become inaccessible.

Enabling purge protection ensures that even if a Key Vault is deleted, the Key Vault and its objects remain recoverable during the configurable retention period. If no action is taken, the Key Vault and its objects will be purged once the retention period elapses.

## Impact

Once purge protection is enabled for a Key Vault, it cannot be disabled.

## Audit

This policy flags an *Azure Key Vault* as `INCOMPLIANT` if `Purge Protection` is **not** set to **Enabled**.

## Default Value

Purge protection is disabled by default.

## References

1. <https://learn.microsoft.com/en-us/azure/key-vault/general/key-vault-recovery>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-governance-strategy#gs-8-define-and-implement-backup-and-recovery-strategy>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-data-protection#dp-8-ensure-security-of-key-and-certificate-repository>
