# Description

This policy identifies Amazon WorkSpaces where EBS volume encryption is not enabled for the root (OS) volume or the user (Data) volume.

## Rationale

Amazon WorkSpaces store user profiles, documents, and application data. Encryption at rest ensures that data remains unreadable if the underlying storage media is compromised or accessed without authorization. This is a critical control for protecting end-user computing environments.

## Audit

This policy flags an *Amazon WorkSpace* as `INCOMPLIANT` if `Root Volume Encryption Enabled` or `User Volume Encryption Enabled` is not set to **true**.

*WorkSpaces* in the **AVAILABLE** `State` are marked as `INAPPLICABLE`.
