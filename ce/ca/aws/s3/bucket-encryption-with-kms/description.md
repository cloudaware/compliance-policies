# Description

This policy identifies AWS S3 Buckets that are not configured to use Server-Side Encryption with AWS Key Management Service (SSE-KMS or DSSE-KMS). Encrypting data at rest in S3 ensures protection against unauthorized access to the underlying storage infrastructure.

When storing data in Amazon S3, you can choose from several mutually exclusive server-side encryption options, depending on how you manage encryption keys and the level of control you require.

- **Server-Side Encryption with Amazon S3 Managed Keys (SSE-S3)**

    By default, all S3 buckets have encryption enabled using SSE-S3. Each object is encrypted with a unique key, which is itself encrypted with a root key that Amazon S3 rotates regularly. SSE-S3 uses 256-bit Advanced Encryption Standard (AES-256) for data protection.

- **Server-Side Encryption with AWS Key Management Service Keys (SSE-KMS)**

    SSE-KMS integrates Amazon S3 with AWS KMS, providing greater control over encryption keys. You can use AWS-managed keys or create and manage customer-managed keys (CMKs). SSE-KMS enables fine-grained access control, centralized key management, key rotation, and detailed key usage auditing through AWS CloudTrail.

- **Dual-Layer Server-Side Encryption with AWS KMS Keys (DSSE-KMS)**

    DSSE-KMS applies two independent layers of AES-256 encryption, first using an AWS KMS data encryption key, and then using an Amazon S3-managed encryption key. This dual-layer approach helps meet compliance requirements for multilayer encryption while remaining compatible with AWS analytics and data processing services.

## Rationale

While SSE-S3 provides a baseline level of encryption, SSE-KMS offers enhanced security, visibility, and control. By using KMS keys, you can manage key lifecycles, enforce rotation policies, define access controls, and audit key usage. Enforcing SSE-KMS or DSSE-KMS ensures compliance with stricter data protection and governance standards.

## Impact

Without SSE-KMS or DSSE-KMS, encryption remains managed solely by Amazon S3, limiting control over key lifecycle management, access policies, and audit visibility. This may reduce compliance posture for organizations subject to regulatory or internal governance requirements.

However, using AWS KMS keys (SSE-KMS or DSSE-KMS) incurs additional costs associated with KMS operations, including key creation, usage, and request-based encryption and decryption. These costs should be considered when implementing KMS-managed encryption at scale.

## Audit

This policy marks an object as `INCOMPLIANT` when `Server Side Encryption Algorithm` is set to **None** (unencrypted) or **AES256** (encrypted with Amazon S3 managed keys).
