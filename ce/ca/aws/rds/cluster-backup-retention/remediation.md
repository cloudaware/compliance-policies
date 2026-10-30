# Remediation

## Set Backup Retention to at Least 7 Days

Update the affected cluster configuration to retain automated backups for at least 7 days.

### **From Command Line**

#### **Amazon RDS DB Clusters**

Use the following AWS CLI command for Aurora DB clusters and RDS Multi-AZ MySQL or PostgreSQL DB clusters:

```sh
aws rds modify-db-cluster \
    --db-cluster-identifier {{db-cluster-id}} \
    --backup-retention-period 7 \
    --apply-immediately
```

#### **Amazon DocumentDB Clusters**

```sh
aws docdb modify-db-cluster \
    --db-cluster-identifier {{db-cluster-id}} \
    --backup-retention-period 7 \
    --apply-immediately
```

#### **Amazon Neptune DB Clusters**

```sh
aws neptune modify-db-cluster \
    --db-cluster-identifier {{db-cluster-id}} \
    --backup-retention-period 7 \
    --apply-immediately
```

Use a higher value if your organization's backup policy requires a longer recovery window. If you prefer to defer the change until the next maintenance window, replace `--apply-immediately` with `--no-apply-immediately` where supported by the service.
