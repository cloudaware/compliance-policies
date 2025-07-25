# Description

The Key Vault contains object keys, secrets, and certificates. Accidental unavailability of a Key Vault can cause immediate data loss or loss of security functions (authentication, validation, verification, non-repudiation, etc.) supported by the Key Vault objects.

It is recommended the Key Vault be made recoverable by enabling the "Do Not Purge" and "Soft Delete" functions. This is in order to prevent loss of encrypted data, including storage accounts, SQL databases, and/or dependent services provided by Key Vault objects (Keys, Secrets, Certificates) etc. This may happen in the case of accidental deletion by a user or from disruptive activity by a malicious user.

**NOTE**: In February 2025, Microsoft will enable soft-delete protection on all key vaults, and users will no longer be able to opt out of or turn off soft-delete.

**WARNING**: A current limitation is that role assignments disappearing when Key Vault is deleted. All role assignments will need to be recreated after recovery.

## Rationale

There could be scenarios where users accidentally run delete/purge commands on Key Vault or an attacker/malicious user deliberately does so in order to cause disruption. Deleting or purging a Key Vault leads to immediate data loss, as keys encrypting data and secrets/certificates allowing access/services will become non-accessible.

There is a Key Vault property that plays a role in permanent unavailability of a Key Vault:

`enablePurgeProtection`: Setting this parameter to `true` for a Key Vault ensures that even if Key Vault is deleted, Key Vault itself or its objects remain recoverable for the next 90 days. Key Vault/objects can either be recovered or purged (permanent deletion) during those 90 days. If no action is taken, the key vault and its objects will subsequently be purged.

Enabling the enablePurgeProtection parameter on Key Vaults ensures that Key Vaults and their objects cannot be deleted/purged permanently.

## Impact

Once purge-protection and soft-delete are enabled for a Key Vault, the action is irreversible.

## Audit

This policy flags an *Azure Key Vault* as `INCOMPLIANT` if `Soft Delete` is set to **Disabled** or `Purge Protection` is **not** set to **Enabled**.

## Default Value

When a new Key Vault is created,

- enableSoftDelete is enabled by default, and
- enablePurgeProtection is disabled by default.

**NOTE**: In February 2025, Microsoft will enable soft-delete protection on all key vaults, and users will no longer be able to opt out of or turn off soft-delete.

## References

1. <https://docs.microsoft.com/en-us/azure/key-vault/key-vault-soft-delete-cli>
2. <https://learn.microsoft.com/en-us/azure/key-vault/general/soft-delete-overview>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-governance-strategy#gs-8-define-and-implement-backup-and-recovery-strategy>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-data-protection#dp-8-ensure-security-of-key-and-certificate-repository>

## Additional Information

When a key is used for SQL server TDE or Encrypting Storage Account, both the features `Do Not Purge` and `Soft Delete` are enabled for the corresponding Key Vault by default by Azure Backend.

**WARNING**: A current limitation of the soft-delete feature across all Azure services is role assignments disappearing when Key Vault is deleted. All role assignments will need to be recreated after recovery.
