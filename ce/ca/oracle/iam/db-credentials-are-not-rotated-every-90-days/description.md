# Description

This policy identifies Oracle IAM DB Credentials that have not been rotated within 90 days. IAM database passwords allow authorized IAM users to authenticate to supported Oracle databases, such as Autonomous Database, and are separate from OCI Console passwords.

## Rationale

Long-lived IAM database passwords increase the exposure window for credential theft, accidental disclosure, and misuse. Rotating these passwords at least every 90 days limits how long a compromised password can be used and supports a predictable credential lifecycle for database access.

## Impact

Rotating an IAM database password can disrupt users, applications, or database clients that still depend on the old password. Create a replacement password, update every dependent database client, and confirm access before deleting the stale password.

## Audit

This policy flags an *Oracle IAM DB Credential* as `INCOMPLIANT` if the `Time Created` field is older than 90 days.
