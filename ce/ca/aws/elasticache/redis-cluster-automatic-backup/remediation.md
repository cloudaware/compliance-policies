# Remediation

## Enable Automatic Backups

### **From Command Line**

**For a Redis cluster with cluster mode enabled (Replication Group):**

```bash
aws elasticache modify-replication-group \
    --replication-group-id {{replication-group-id}} \
    --snapshot-retention-limit {{7}} \
    --apply-immediately
```

**For a Redis cluster with cluster mode disabled (Single Node or Non-Clustered):**

```bash
aws elasticache modify-cache-cluster \
    --cache-cluster-id {{cache-cluster-id}} \
    --snapshot-retention-limit {{7}} \
    --apply-immediately
```

Adjust the `--snapshot-retention-limit` value to meet your organization’s backup retention policy.

Using `--apply-immediately` applies changes immediately; omit it to defer the change until the next maintenance window.
