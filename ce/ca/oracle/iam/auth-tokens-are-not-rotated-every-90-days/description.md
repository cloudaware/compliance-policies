# Description

This policy identifies Oracle IAM auth tokens that were created more than 90 days ago. Auth tokens are long-term credentials used to authenticate with services that do not support Oracle Cloud Infrastructure signature-based authentication.

## Rationale

Auth tokens provide access at the same authorization level as the associated user for supported services. Rotating them at least every 90 days limits the time a compromised token can be used and supports a predictable credential lifecycle for users, applications, and integrations.

## Impact

Rotating an auth token can disrupt applications, integrations, or users that still depend on the old token. Because the token value is only available when the token is created, create a replacement token, update dependent workloads, and confirm access before deleting the stale token.

## Audit

This policy flags an *Oracle IAM Auth Token* as `INCOMPLIANT` if the `Time Created` field is more than 90 days old.
