# Description

Storage accounts with the activity log exports can be configured to use Customer Managed Keys (CMK).

## Rationale

Configuring the storage account with the activity log export container to use CMKs provides additional confidentiality controls on log data, as a given user must have read permission on the corresponding storage account and must be granted decrypt permission by the CMK.

## Impact

**Note**: You must have your Key Vault set up to use this. All audit logs will be encrypted with a key you provide. You will need to set up customer-managed keys separately and select which key to use via the instructions here. You are responsible for the lifecycle of the keys and must replace them at your chosen intervals to keep the data secure.

## Audit

This policy flags an *Azure Subscription Diagnostic Setting* as `INCOMPLIANT` if the associated `Storage Account`, the logs being sent to, is not encrypted by a customer-managed key. This is detected when the `Encryption Key Source` field is not set to **Microsoft.Keyvault**, indicating that the storage account relies on a Microsoft‑managed key.

## Default Value

By default, a storage account `keySource` is set to `Microsoft.Storage`, allowing encryption with a vendor-managed key rather than a customer-managed key.

## References

1. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-data-protection#dp-5-use-customer-managed-key-option-in-data-at-rest-encryption-when-required>
2. <https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/activity-log?tabs=cli#managing-legacy-log-profiles>
3. <https://learn.microsoft.com/en-us/azure/security/fundamentals/data-encryption-best-practices#protect-data-at-rest>
