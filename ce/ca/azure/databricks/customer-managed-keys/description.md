# Description

Customer-managed keys introduce additional depth to security by providing a means to manage access control for encryption keys. Where compliance and security frameworks indicate the need, and organizational capacity allows, sensitive data at rest can be encrypted using customer-managed keys (CMK) rather than Microsoft-managed keys.

## Rationale

Organizations with stricter needs for control of encryption keys should enable customer-managed keys (CMK) for greater control over data encryption, auditing, and regulatory compliance. Azure Key Vault should be used to store and manage CMKs.
Enforcing encryption at rest and in transit in Azure Databricks:

- Protects sensitive data from unauthorized access.
- Ensures regulatory compliance (ISO 27001, GDPR, HIPAA, SOC 2).
- Allows key revocation and rotation control with customer-managed keys (CMK).
- Mitigates insider threats by preventing unauthorized access to raw storage.

## Impact

Enabling CMK encryption requires additional configuration. Key management introduces maintenance overhead (rotation, revocation, lifecycle management). Potential access issues will be encountered if keys are deleted or rotated incorrectly.

## Audit

This policy flags an *Azure Databricks Workspace* as `INCOMPLIANT` if the `Encryption: Managed Disks Key Source` field is either:

- **Empty** indicating that no encryption is configured, or
- **Not** set to **Microsoft.Keyvault**, indicating the use of a Microsoft-managed key instead of a customer-managed key.

## Default Value

By default, encryption type is set to Microsoft-managed keys.

## References

1. <https://learn.microsoft.com/en-us/azure/security/fundamentals/data-encryption-best-practices#protect-data-at-rest>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-data-protection#dp-5-use-customer-managed-key-option-in-data-at-rest-encryption-when-required>
3. <https://learn.microsoft.com/en-us/azure/databricks/security/keys/cmk-managed-disks-azure/cmk-managed-disks-azure>
