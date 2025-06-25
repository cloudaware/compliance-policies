# Remediation

## Using SQL

The executing role must hold the **OWNERSHIP** privilege on the target user account to modify its properties via SQL.

To assign a default role to a Snowflake user, execute the following SQL command:

```sql
ALTER USER {{username}} 
    SET DEFAULT_ROLE = {{role_name}};
```

**Note**: The specified `{{role_name}}` must already exist in Snowflake.
