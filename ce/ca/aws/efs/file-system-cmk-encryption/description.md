Here’s a more polished and professional version of your text, with improved clarity, consistency, and tone while preserving the original meaning:

---

# Description

This policy identifies AWS EFS file systems that are encrypted using AWS-managed keys (the default keys applied by the EFS service when no customer-managed keys are specified) rather than AWS KMS customer-managed keys (CMKs). Using CMKs provides greater control over encryption key management, access policies, and auditing capabilities compared to AWS-managed keys.

## Rationale

Encrypting data at rest adds an important layer of security by protecting stored data from unauthorized access to the underlying storage. Although AWS provides a default managed key (`aws/elasticfilesystem`) for EFS encryption, using a customer-managed keys offers several additional security and governance benefits:

1. **Enhanced Control:** Full ownership of the key lifecycle, including creation, rotation, and permission management.
2. **Improved Auditing:** Detailed key usage visibility through AWS CloudTrail, enabling precise tracking of when and how encryption keys are used.
3. **Configurable Rotation:** Support for automatic or manual key rotation in alignment with organizational security requirements.
4. **Separation of Duties:** Clear separation between encryption key administration and data or service administration responsibilities.

## Audit

This policy flags an *AWS EFS File System* as `INCOMPLIANT` if either there is no *AWS KMS Key* attached to the File System or *AWS KMS Key* manager is not `CUSTOMER`.

*File systems* with encryption disabled (`Encrypted` set to **false**) are marked as `INAPPLICABLE` and are addressed in the [`AWS EFS File System encryption is not enabled`](../file-system-encryption/) policy.
