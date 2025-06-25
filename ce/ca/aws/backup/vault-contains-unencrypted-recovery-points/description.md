# Description

Ensure that all Recovery Points stored within an AWS Backup Vault are encrypted. AWS Backup offers centralized backup and recovery capabilities, enforcing encryption on recovery points is a critical security measure to protect data at rest.

## Rationale

Encrypting backup data is essential to protect sensitive information (such as application assets, customer records, and proprietary intellectual property) from unauthorized access. Unencrypted recovery points risk data breaches and can lead to regulatory fines or reputational damage.

## Impact

If an unauthorized user with access to the vault’s storage location could restore and inspect unencrypted backups.

Enabling encryption may incur additional charges for KMS key usage and management. The IAM role performing backup and restore operations must have permissions to use the specified KMS key.

## Audit

This policy flags an *AWS Backup Backup Vault* as `INCOMPLIANT` if at least one related `AWS Backup Recovery Point` is not encrypted with a KMS key indicated by the `KMS Master Key ID` field being **empty**.
