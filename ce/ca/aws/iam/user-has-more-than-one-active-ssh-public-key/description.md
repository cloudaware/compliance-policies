# Description

Identify and deactivate unnecessary IAM SSH public keys used to authenticate access to AWS CodeCommit repositories. AWS allows up to two active SSH public keys per IAM user; however, maintaining two keys should be limited to the key rotation process only. As a security best practice, deactivate the old SSH public key once a new key is created so that only one active key remains for the IAM user.

## Rationale

Similar to IAM access keys, maintaining multiple active SSH public keys for a single IAM user increases security risk if any of the credentials are lost, stolen, or mismanaged. Restricting users to a single active key simplifies auditing and helps ensure that outdated or redundant credentials are not left enabled.

## Audit

This policy flags an *AWS IAM User* as `INCOMPLIANT` if more than one related *AWS IAM SSH Public Key* is in the **Active** state.

An *AWS IAM User* is marked as `INAPPLICABLE` if it has no associated **Active** *AWS IAM SSH Public Key*.
