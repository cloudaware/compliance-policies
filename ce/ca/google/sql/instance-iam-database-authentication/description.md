# Description

This policy checks whether IAM database authentication is enabled for Google Cloud SQL for MySQL and PostgreSQL instances. IAM database authentication allows users and applications to authenticate with IAM principals and short-lived tokens instead of static database passwords.

## Rationale

IAM database authentication centralizes access control in Google Cloud IAM and reduces the need to distribute and rotate static database passwords. It also improves attribution because database access can be tied to user accounts and service accounts.

## Impact

Applications and users may need connection changes to use IAM database authentication. Existing password-based database users should be reviewed and migrated carefully to avoid service interruption.

## Audit

This policy flags a *Google Cloud SQL Instance* as `INCOMPLIANT` when the instance is a MySQL or PostgreSQL instance and IAM database authentication is not enabled.

For PostgreSQL instances, the `cloudsql.iam_authentication` database flag must be set to `on`.

For MySQL instances, the `cloudsql_iam_authentication` database flag must be set to `on`.

Cloud SQL instances using other database engines are marked as `INAPPLICABLE`.

## Default Value

By default, IAM database authentication is not enabled for Cloud SQL instances.
