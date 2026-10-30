# Remediation

## Enable IAM Database Authentication

To enable IAM Database Authentication for an existing AWS RDS instance, update the instance configuration to allow authentication using IAM-generated tokens.

### **From Command Line**

Run the following command to enable IAM database authentication for the specified DB instance:

```sh
aws rds modify-db-instance \
    --db-instance-identifier {{instance-id}} \
    --enable-iam-database-authentication \
    --apply-immediately
```

By default, configuration changes are applied during the next scheduled maintenance window.
Using the `--apply-immediately` parameter forces the change to take effect as soon as possible and may result in a brief service interruption.
