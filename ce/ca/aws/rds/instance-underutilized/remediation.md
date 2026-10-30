# Remediation

## Right-Size Underutilized RDS Instances

### Key Considerations

- Review CPU, read IOPS, write IOPS, connection count, and workload seasonality before changing the instance class.
- Ensure that the new instance class supports your workload and storage requirements.
- Coordinate with application owners before resizing to avoid unexpected performance issues.
- Prefer applying changes during a maintenance window for production workloads.

### Modify the DB Instance Class

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
