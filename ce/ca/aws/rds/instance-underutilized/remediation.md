# Remediation

## Right-Size Underutilized Instances

### Key considerations

- Ensure that the new instance class supports your workload and storage requirements.
- Coordinate with application owners before resizing to avoid unexpected performance issues.

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
