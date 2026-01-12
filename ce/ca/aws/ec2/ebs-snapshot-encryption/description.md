# Description

This policy identifies AWS EBS snapshots that are not encrypted. EBS snapshots can contain sensitive or critical data, and enabling encryption helps protect this data at rest. Snapshot encryption is handled transparently by AWS and does not require any changes to your server instances or applications.

## Rational

Encrypting EBS snapshots ensures that data is protected from unauthorized access. If an unencrypted snapshot is shared or accessed by an unauthorized entity, the data it contains may be exposed.

EBS snapshot encryption uses the AES-256 encryption algorithm and is fully managed by AWS through the Amazon Key Management Service (KMS), ensuring secure key storage and access control.

## Audit

This policy flags an *AWS EBS Snapshot* as `INCOMPLIANT` if the `Encrypted` field is set to `false`.
