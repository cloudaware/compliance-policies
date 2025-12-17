# Description

Key vaults contain object keys, secrets, and certificates. Deletion of a key vault can cause immediate data loss or loss of security functions (authentication, validation, verification, non-repudiation, etc.) supported by the key vault objects.

It is recommended the key vault be made recoverable by enabling the "purge protection" function. This is to prevent the loss of encrypted data, including storage accounts, SQL databases, and/or dependent services provided by key vault objects (keys, secrets, certificates, etc.).

**NOTE**: In February 2025, Microsoft enabled soft delete protection on all key vaults. Users can no longer opt out of or turn off soft delete.

**WARNING**: A current limitation is that role assignments disappear when a key vault is deleted. All role assignments will need to be recreated after recovery.

## Rationale

Users may accidentally run delete/purge commands on a key vault, or an attacker or malicious user may do so deliberately in order to cause disruption. Deleting or purging a key vault leads to immediate data loss, as keys encrypting data and secrets/certificates allowing access/services will become inaccessible.

Enabling purge protection ensures that even if a key vault is deleted, the key vault and its objects remain recoverable during the configurable retention period. If no action is taken, the key vault and its objects will be purged once the retention period elapses.

## Impact

Once purge protection is enabled for a key vault, it cannot be disabled.

## Audit

This policy flags an *Azure Key Vault* as `INCOMPLIANT` if `Purge Protection` is **not** set to **Enabled**.

## Default Value

Purge protection is disabled by default.

## References

1. <https://learn.microsoft.com/en-us/azure/key-vault/general/key-vault-recovery>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-governance-strategy#gs-8-define-and-implement-backup-and-recovery-strategy>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-data-protection#dp-8-ensure-security-of-key-and-certificate-repository>
