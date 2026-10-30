# Remediation

## Enable Copy Tags to Snapshot for an RDS Instance

To ensure that RDS snapshots inherit the same tags as their parent database instances, enable the **Copy Tags to Snapshot** setting. This ensures consistent cost allocation, security classification, and access control across both live databases and their backups.

### **From Command Line**

Use the following AWS CLI command to enable tag propagation to snapshots for the specified RDS instance:

```sh
aws rds modify-db-instance \
    --db-instance-identifier {{db-instance-id}} \
    --copy-tags-to-snapshot \
    --apply-immediately
```

### Considerations

- Enabling this setting does not affect existing snapshots; it applies only to snapshots created after the change.
- The modification does not require downtime and can be applied immediately.
