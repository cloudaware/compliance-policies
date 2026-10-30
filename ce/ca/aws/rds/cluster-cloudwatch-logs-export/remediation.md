# Remediation

## Enable Required CloudWatch Log Exports

To ensure database logs are retained and available for centralized monitoring, troubleshooting, and auditing, configure supported AWS RDS clusters to export the required database log types to Amazon CloudWatch Logs.

CloudWatch log exports are enabled at the cluster level by updating the DB cluster configuration with the `--cloudwatch-logs-export-configuration` parameter. The required log type depends on the database engine and engine version.

### **From Command Line**

#### **Aurora MySQL**

Enable export of audit logs:

```sh
aws rds modify-db-cluster \
    --db-cluster-identifier {{db-cluster-identifier}} \
    --cloudwatch-logs-export-configuration '{"EnableLogTypes":["audit"]}'
```

#### **Aurora PostgreSQL**

Enable export of PostgreSQL logs:

```sh
aws rds modify-db-cluster \
    --db-cluster-identifier {{db-cluster-identifier}} \
    --cloudwatch-logs-export-configuration '{"EnableLogTypes":["postgresql"]}'
```

#### **Amazon DocumentDB**

Enable export of audit logs:

```sh
aws docdb modify-db-cluster \
    --db-cluster-identifier {{db-cluster-identifier}} \
    --cloudwatch-logs-export-configuration '{"EnableLogTypes":["audit"]}'
```

#### **Amazon Neptune**

Enable export of audit logs:

```sh
aws neptune modify-db-cluster \
    --db-cluster-identifier {{db-cluster-identifier}} \
    --cloudwatch-logs-export-configuration '{"EnableLogTypes":["audit"]}'
```

### Considerations

- Supported log types vary by database engine and engine version. Verify that the required log type is supported for the engine version in use before applying changes.
- Once enabled, logs are continuously streamed to Amazon CloudWatch Logs and retained according to the configured retention policy.
- Additional AWS charges may apply for log ingestion, storage, and retention based on log volume.
