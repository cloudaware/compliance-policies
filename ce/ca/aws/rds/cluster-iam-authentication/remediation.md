# Remediation

## Enable IAM Database Authentication

Update the cluster configuration to allow authentication using IAM-generated tokens.

### **From Command Line**

#### Amazon RDS Aurora

Run the following command to enable IAM database authentication for the specified DB cluster:

```sh
aws rds modify-db-cluster \
    --db-cluster-identifier {{cluster-id}} \
    --enable-iam-database-authentication \
    --apply-immediately
```

#### Amazon Neptune

```sh
aws neptune modify-db-cluster \
    --db-cluster-identifier {{cluster-id}} \
    --enable-iam-database-authentication \
    --apply-immediately
```

By default, configuration changes are applied during the next scheduled maintenance window.
Using the `--apply-immediately` parameter forces the change to take effect as soon as possible, which may cause a brief service interruption depending on the cluster configuration.
