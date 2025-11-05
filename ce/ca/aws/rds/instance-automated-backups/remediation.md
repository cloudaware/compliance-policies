# Remediation

## Enable Automated Backups

### **From Command Line**

To enable automated backups for an RDS instance, use the `modify-db-instance` command. Specify the desired retention period in days (up to 35) and apply the change immediately if appropriate:

```sh
aws rds modify-db-instance \
    --db-instance-identifier {{db-instance}} \
    --backup-retention-period 3 \
    --apply-immediately
```

For Multi-AZ DB clusters, use the `modify-db-cluster` command instead:

```sh
aws rds modify-db-cluster \
    --db-cluster-identifier {{db-cluster}} \
    --backup-retention-period 3 \
    --apply-immediately
```

You can include either the `--apply-immediately` flag to apply changes right away, or `--no-apply-immediately` to defer the update until the next maintenance window.
