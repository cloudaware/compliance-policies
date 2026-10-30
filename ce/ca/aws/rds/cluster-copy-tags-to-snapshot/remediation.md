# Remediation

## Enable Copy Tags to Snapshot for an RDS Cluster

To ensure that RDS snapshots consistently inherit the same tags as their parent database clusters, enable the **Copy Tags to Snapshot** setting. This helps maintain consistent cost allocation, data classification, and access control across both active database resources and their backups.

This configuration change can be applied at the cluster level and affects all future snapshots created for the cluster.

### **From Command Line**

#### **Amazon RDS DB Clusters**

Use the following AWS CLI command for Aurora DB clusters and RDS Multi-AZ MySQL or PostgreSQL DB clusters:

```sh
aws rds modify-db-cluster \
    --db-cluster-identifier {{db-cluster-id}} \
    --copy-tags-to-snapshot \
    --apply-immediately
```

#### **Amazon Neptune DB Clusters**

Use the following AWS CLI command for Neptune DB clusters:

```sh
aws neptune modify-db-cluster \
    --db-cluster-identifier {{db-cluster-id}} \
    --copy-tags-to-snapshot \
    --apply-immediately
```

### Considerations

- This setting applies only to snapshots created after the configuration change; existing snapshots are not updated.
- The change does not require downtime and can be applied immediately.
