# Remediation

## Enable Multi-AZ Deployment

Enable Multi-AZ deployment for the affected DMS replication instance.

### **From Command Line**

Run the following command to enable Multi-AZ deployment:

```sh
aws dms modify-replication-instance \
    --replication-instance-arn {{replication-instance-arn}} \
    --multi-az \
    --apply-immediately
```

Confirm that the replication instance reports `MultiAZ` as `true` after the modification completes.
