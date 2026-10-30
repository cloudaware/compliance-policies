# Remediation

## Enable Aurora Backtracking

Update the affected Aurora MySQL DB cluster to set a backtrack window greater than 0 seconds.

### **From Command Line**

Use the following AWS CLI command to enable backtracking for an existing Aurora MySQL DB cluster:

```sh
aws rds modify-db-cluster \
    --db-cluster-identifier {{db-cluster-id}} \
    --backtrack-window {{seconds}} \
    --apply-immediately
```

Set `{{seconds}}` to a value that matches your recovery requirements. If you prefer to defer the change until the next maintenance window, replace `--apply-immediately` with `--no-apply-immediately`.

### Considerations

- Backtracking is supported only for Aurora MySQL DB clusters that support this feature.
- A larger backtrack window can increase storage consumption and cost.
- Backtracking supplements automated backups and snapshots; it does not replace long-term backup retention requirements.
