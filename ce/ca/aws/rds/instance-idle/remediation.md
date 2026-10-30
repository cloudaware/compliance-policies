# Remediation

## Address Idle RDS Instances

### Key Considerations

- Confirm with application and database owners that the instance is no longer required before stopping, resizing, or deleting it.
- Review dependencies, connection strings, scheduled jobs, backups, and retention requirements.
- Stopping an instance retains the underlying data and allows it to be restarted later.
- Deleting an instance permanently removes it. Create a final snapshot unless an approved retention process already exists.
- If the instance still supports a low-volume workload, consider rightsizing instead of deleting it.

### Stop or Delete the Instance

#### **From AWS CLI**

Stop the instance:

```sh
aws rds stop-db-instance \
    --db-instance-identifier {{db-instance-id}}
```

Create a manual snapshot before deletion:

```sh
aws rds create-db-snapshot \
    --db-snapshot-identifier {{final-snapshot-name}} \
    --db-instance-identifier {{db-instance-id}}
```

Delete the idle instance after the manual snapshot is available:

```sh
aws rds delete-db-instance \
    --db-instance-identifier {{db-instance-id}} \
    --skip-final-snapshot
```

### Right-Size the DB Instance

#### **From AWS CLI**

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
