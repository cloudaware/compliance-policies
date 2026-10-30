# Description

This policy identifies Amazon Cognito user pools that do not have deletion protection enabled.

## Rationale

Amazon Cognito user pools often back production sign-in, registration, password recovery, and token issuance flows. Accidental deletion of a user pool can immediately disrupt authentication for dependent applications and may require complex restoration or full recreation of the identity store.

Enabling deletion protection adds an explicit administrative safeguard. Before a user pool can be deleted, an administrator must first disable deletion protection, which reduces the likelihood of unintended removal caused by manual error, rushed operational changes, or misconfigured automation.

## Audit

This policy flags an *AWS Cognito User Pool* as `INCOMPLIANT` when `Deletion Protection` is **INACTIVE**.
