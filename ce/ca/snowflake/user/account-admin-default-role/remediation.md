# Remediation

## Using SQL

The executing role must hold the **OWNERSHIP** privilege on the target user account to modify its properties via SQL.

Execute the following SQL command for each user found to have `ACCOUNTADMIN` as their default role:

```sql
ALTER USER {{username}}
    SET DEFAULT_ROLE = {{non_accountadmin_role}};
```

Replace `{{non_accountadmin_role}}` with an appropriate, lower-privileged role that aligns with the user’s operational needs (e.g., `SYSADMIN`, `SECURITYADMIN`, or a custom business role).

- If the user legitimately requires elevated privileges, retain access to `ACCOUNTADMIN`, but require them to explicitly activate it via the `USE ROLE ACCOUNTADMIN;` command when necessary.

- Revoke or reassign this role where it is no longer justified, following your organization’s access control and change management policies.
