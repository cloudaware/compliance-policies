# Remediation

## Decommission Idle RDS Instances

### Key Considerations

- If deletion is not an option (e.g., business constraints), consider downsizing the instance.
- Confirm with application and database owners that the instance is no longer required before stopping or deleting it.
- Stopping an instance retains the underlying data and allows it to be restarted later.
- Deleting an instance permanently removes it. Always take a final snapshot (if needed) before deletion.

### Stop or Delete the Instance

#### **From Command Line**

Stop the instance:

```sh
aws rds stop-db-instance \
    --db-instance-identifier {{db-instance-id}}
```

Take a final snapshot before deletion:

```sh
aws rds create-db-snapshot \
    --db-snapshot-identifier {{final-snapshot-name}} \
    --db-instance-identifier {{db-instance-id}}
```

Delete the idle instance:

```sh
aws rds delete-db-instance \
    --db-instance-identifier {{db-instance-id}} \
    --skip-final-snapshot
```

### Downsize the DB instance

#### **From Command Line**

To apply during the next maintenance window (recommended for production):

```sh
aws rds modify-db-instance \
    --db-instance-identifier {{db-instance-id}} \
    --db-instance-class {{new-instance-class}} \
    --apply-immediately false
```

To apply immediately (causes a brief outage while resizing):

```sh
aws rds modify-db-instance \
    --db-instance-identifier {{db-instance-id}} \
    --db-instance-class {{new-instance-class}} \
    --apply-immediately true
```
