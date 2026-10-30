# Description

This policy identifies active Oracle IAM Users that have more than one API key. OCI API keys are long-term credentials used to sign programmatic requests to Oracle Cloud Infrastructure APIs.

## Rationale

Maintaining multiple API keys for a single IAM user increases the number of long-lived credentials that can be exposed, misused, or left unmanaged. A second key should normally exist only during a planned rotation or migration window. Removing redundant keys reduces credential sprawl and simplifies monitoring, ownership, and incident response.

## Impact

Removing an API key can disrupt applications, scripts, integrations, or users that still depend on that key for OCI API access. Before deleting a redundant key, identify the workload that uses it, move the workload to the retained key or a more appropriate authentication method, and confirm that access remains functional.

## Audit

This policy flags an *Oracle IAM User* as `INCOMPLIANT` if the `User Status` field is set to **ACTIVE** and the user has more than one related *Oracle IAM User API Key*.

Users whose `User Status` field is not set to **ACTIVE** are marked as `INAPPLICABLE`. Active users with zero or one API key are marked as `COMPLIANT`.
