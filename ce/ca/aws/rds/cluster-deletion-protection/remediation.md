# Remediation

## Enable Deletion Protection

Deletion Protection prevents an Amazon RDS cluster from being accidentally deleted through the AWS Management Console, AWS CLI, or API. Enabling this setting adds an explicit safeguard against unintended destructive actions.

### **From Command Line**

Run the following command to enable Deletion Protection for the specified RDS cluster:

```sh
aws rds modify-db-cluster \
    --db-cluster-identifier {{cluster-id}} \
    --deletion-protection \
    --apply-immediately
```

> **Note:** Enabling Deletion Protection does not impact cluster availability. To delete the cluster in the future, this setting must first be manually disabled.
