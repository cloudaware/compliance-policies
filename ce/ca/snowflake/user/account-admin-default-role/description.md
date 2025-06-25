# Description

Ensure that the `ACCOUNTADMIN` role is not set as the default role for Snowflake Users.

## Rationale

The `ACCOUNTADMIN` role grants full control over account parameters, billing data, user/role definitions, warehouses, and all metadata objects. Defaulting to this role for routine queries or development tasks exposes critical controls and sensitive information unnecessarily.

Forcing users to explicitly switch into `ACCOUNTADMIN` for high-impact tasks ensures that every use of the role is a deliberate action, improving incident investigations and reducing accidental misuse.

Snowflake’s RBAC model provides specialized system roles (e.g., `SYSADMIN`, `SECURITYADMIN`, `USERADMIN`) that should serve as default roles for administrators of specific functions.

## Audit

This policy marks a *Snowflake User* as `INCOMPLIANT` if `Default Role Name` field is set to **ACCOUNTADMIN**.
