# Remediation

## Password Rotation

### Using SQL

The executing role must hold the **OWNERSHIP** privilege on the target user account to modify its properties via SQL.

1. Reset the User Password:

```sql
ALTER USER {{username}} 
    SET PASSWORD = '{{new_password}}';
```

2. Enforce Password Change on Next Login (Recommended):

```sql
ALTER USER <username> SET MUST_CHANGE_PASSWORD = TRUE;
```
