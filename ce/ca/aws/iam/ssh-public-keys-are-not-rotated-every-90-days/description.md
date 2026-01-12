# Description

Identify AWS IAM SSH public keys that have been active for more than 90 days without rotation.

Ensure that all IAM SSH public keys are rotated at least every 90 days to reduce the risk of accidental exposure and to protect AWS CodeCommit repositories from unauthorized access.

## Rationale

IAM SSH public keys are used to authenticate users for programmatic access to services such as AWS CodeCommit. Similar to passwords and access keys, these credentials should be rotated regularly. Regular key rotation limits the amount of time a compromised key can be used to access source code repositories.

## Audit

This policy flags an *AWS IAM SSH Public Key* as `INCOMPLIANT` if the **Upload Date** is older than 90 days.

An *AWS IAM SSH Public Key* is marked as `INAPPLICABLE` if its **Status** is not set to `Active`.
