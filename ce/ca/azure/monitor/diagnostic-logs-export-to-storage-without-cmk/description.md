# Description

Storage accounts with the activity log exports can be configured to use Customer Managed Keys (CMK).

## Rationale

Configuring the storage account with the activity log export container to use CMKs provides additional confidentiality controls on log data, as a given user must have read permission on the corresponding storage account and must be granted decrypt permission by the CMK.

## Impact

**NOTE**: You must have your key vault setup to utilize this. All Audit Logs will be encrypted with a key you provide. You will need to set up customer managed keys separately, and you will select which key to use via the instructions here. You will be responsible for the lifecycle of the keys, and will need to manually replace them at your own determined intervals to keep the data secure.

## Audit

This policy flags an *Azure Subscription Diagnostic Setting* as `INCOMPLIANT` if the associated `Storage Account`, the logs being sent to, is not encrypted by a customer-managed key. This is detected when the `Encryption Key Source` field is not set to **Microsoft.Keyvault**, indicating that the storage account relies on a Microsoft‑managed key.

## Default Value

By default, for a storage account `keySource` is set to `Microsoft.Storage` allowing encryption with vendor Managed key and not a Customer Managed Key.

## References

1. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-data-protection#dp-5-use-customer-managed-key-option-in-data-at-rest-encryption-when-required>
2. <https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/activity-log?tabs=cli#managing-legacy-log-profiles>
