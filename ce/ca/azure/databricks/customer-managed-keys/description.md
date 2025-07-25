# Description

Azure Databricks encrypts data in transit using TLS 1.2+ to secure API, workspace, and cluster communications. By default, data at rest is encrypted using Microsoft-managed keys.

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
