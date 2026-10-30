# Remediation

## Enable Deletion Protection

To prevent accidental deletion of Amazon RDS instances, enable the Deletion Protection feature on existing database instances.

### **From Command Line**

Run the following command to enable deletion protection for the specified RDS instance:

```sh
aws rds modify-db-instance \
    --region {{region}} \
    --db-instance-identifier {{instance-id}} \
    --deletion-protection \
    --apply-immediately
```

### Considerations

- The `--apply-immediately` parameter applies the change as soon as possible and also applies any pending modifications.
- Enabling deletion protection itself does not require downtime; however, applying other pending modifications may result in a brief service interruption.
- If the `--apply-immediately` parameter is omitted, the change is applied during the next scheduled maintenance window.
