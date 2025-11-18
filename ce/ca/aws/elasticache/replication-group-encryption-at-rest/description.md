# Description

This policy identifies AWS ElastiCache Replication Groups that are not configured with encryption at rest.
Encryption at rest protects data stored on disk by encrypting it with a key managed through AWS Key Management Service (KMS).

## Rationale

Enabling encryption at rest is a critical security control that protects sensitive data in ElastiCache for Redis clusters. It ensures that if the underlying storage media is accessed or compromised, the data remains unreadable without the appropriate decryption key.

## Audit

This policy flags an *AWS ElastiCache Replication Group* as `INCOMPLIANT` if the `At Rest Encryption Enabled` checkbox is set to **false**.

The *Replication Group* is marked as `INAPPLICABLE` if its `Status` is not **available**.
