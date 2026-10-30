# Remediation

## Right-Size Overutilized Instances

### Key considerations

- Ensure that the new instance class supports your workload and storage requirements.
- Review database performance metrics, slow queries, connection patterns, and disk I/O before resizing.
- Coordinate with application owners before resizing to avoid unexpected availability or performance issues.
- Prefer applying changes during a maintenance window for production workloads to minimize downtime.

### Scale the DB instance

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
