# Description

This policy identifies Google Projects that contain one or more Cloud KMS cryptographic keys and have at least one principal (user, group, or service account) assigned the primitive `roles/owner` role.

## Rationale

The `roles/owner` role is a highly privileged primitive role that grants full administrative access to all resources within a project, including Cloud KMS keys. This permission allows principals to create, delete, modify, and use keys for cryptographic operations such as encryption and decryption.

Assigning the Owner role in projects containing sensitive cryptographic keys violates the principle of least privilege and the security best practice of separation of duties. A single compromised Owner account could lead to the exposure, misuse, or destruction of sensitive encrypted data.

## Audit

This policy flags a *Google Project* as `INCOMPLIANT` if it contains at least one *Google Cloud KMS Crypto Key* and has a related *IAM Policy Binding* with the **roles/owner** role.
