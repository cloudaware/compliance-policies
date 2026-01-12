# Description

This policy identifies AWS EBS Volumes that are encrypted using AWS managed keys instead of AWS KMS customer-managed keys. Using customer-managed keys provides greater control over the encryption and decryption process for data stored on EBS volumes. When configured, KMS customer-managed keys are used to encrypt data at rest, EBS snapshots, and disk I/O.

## Rationale

Using customer-managed KMS keys to protect EBS data enables granular control over key usage and access permissions, supporting the Principle of Least Privilege (PoLP). Amazon KMS allows you to create, rotate, disable, and audit customer-managed keys, improving governance and auditability of encryption key management.

## Audit

This policy flags an *AWS EBS Volume* as `INCOMPLIANT` if either of the following conditions is met:

- No *AWS KMS Key* is associated with the volume, or
- The *AWS KMS Key* `Manager` is not **CUSTOMER**.

EBS volumes that are **not attached** to any instance are marked as `INAPPLICABLE`.

Unencrypted EBS volumes are addressed by the [`AWS EBS Attached Volume is not encrypted`](../ebs-volume-encryption) policy and are marked as `INAPPLICABLE`.
