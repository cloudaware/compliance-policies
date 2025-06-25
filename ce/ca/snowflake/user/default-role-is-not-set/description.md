# Description

Ensure that each Snowflake user account has a designated `Default Role` configured.

## Rational

Assigning a `Default Role` to users reinforces the principle of least privilege by clearly defining the initial set of permissions available upon login. This practice:

- Provides predictable and controlled access at session start.
- Supports standardized access management and auditing across the organization.

## Audit

This policy marks a *Snowflake User* as `INCOMPLIANT` if `Default Role Name` field is **empty**.
