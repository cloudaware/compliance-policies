# Description

This policy identifies AWS Secrets Manager secrets whose current secret value has not been rotated within the last 90 days.

## Rationale

Secrets stored in AWS Secrets Manager often protect database credentials, API keys, tokens, and other sensitive values. If a secret remains unchanged for long periods, any compromised credential can stay valid long enough to be reused by an attacker.

Regular rotation reduces this exposure window and supports stronger credential lifecycle management.

## Impact

Rotating a secret can interrupt dependent applications, functions, or services if they are not prepared to consume the new value. Validate the rotation workflow and downstream integrations before rotating a production secret or enabling automatic rotation.

## Audit

This policy excludes secrets that have automatic rotation enabled. For the remaining secrets, it evaluates the `AWSCURRENT` secret version when version records are available. It flags an *AWS Secrets Manager Secret* as `INCOMPLIANT` when either of the following conditions is met:

- The current secret version was created more than **90 days** ago.
- No current secret version is available and the `Last Rotated Date` is empty or more than **90 days** old.

An *AWS Secrets Manager Secret* that is scheduled for deletion or has automatic rotation enabled is marked as `INAPPLICABLE`.
