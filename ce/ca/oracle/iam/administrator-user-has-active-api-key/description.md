# Description

This policy identifies active Oracle IAM users that are members of the tenancy `Administrators` group and have at least one API key. OCI API keys are long-term credentials used to sign programmatic requests to Oracle Cloud Infrastructure APIs.

## Rationale

Tenancy administrator users have broad control over OCI resources and identity configuration. Keeping active API keys on these users creates durable programmatic access that can bypass interactive session controls and remain usable until the key is deleted. Removing API keys from administrator users reduces the impact of credential disclosure and encourages privileged operations to use tightly scoped identities.

## Impact

Deleting an API key can disrupt applications, scripts, integrations, or users that still depend on that key for OCI API access. Before deleting the key, identify its owner and consumers, move required automation to a least-privileged user, instance principal, resource principal, or dynamic group, and confirm that access remains functional.

## Audit

This policy flags an *Oracle IAM User* as `INCOMPLIANT` if the `User Status` field is set to **ACTIVE**, the user is a member of the `Administrators` group, and the user has at least one related *Oracle IAM User API Key*.

Users whose `User Status` field is not set to **ACTIVE** are marked as `INAPPLICABLE`. Active users that are not members of the `Administrators` group are marked as `INAPPLICABLE`. Active users that are members of the `Administrators` group and have no API keys are marked as `COMPLIANT`.
