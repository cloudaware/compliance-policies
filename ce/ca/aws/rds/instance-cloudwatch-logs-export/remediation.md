# Remediation

## Enable CloudWatch Log Exports

To ensure database logs are retained and available for monitoring and auditing, configure AWS RDS Instances to export supported log types to Amazon CloudWatch Logs. The available log types depend on the database engine and engine version.

To enable CloudWatch log exports for an RDS instance, update the instance configuration using the `--cloudwatch-logs-export-configuration` parameter. This parameter specifies which database log types are sent to Amazon CloudWatch Logs.

**Note:** Changes to `--cloudwatch-logs-export-configuration` are applied **immediately** by AWS. The `--apply-immediately` or `--no-apply-immediately` options have no effect on this modification.

### **From Command Line**

#### **MariaDB**

Enable export of MariaDB `error`, `general`, `slowquery`, and `audit` logs:

```sh
aws rds modify-db-instance \
    --region {{region}} \
    --db-instance-identifier {{instance-id}} \
    --cloudwatch-logs-export-configuration '{"EnableLogTypes":["error","general","slowquery","audit"]}'
```

---

#### **MySQL**

Enable export of MySQL `error`, `general`, `slowquery`, and `audit` logs:

```sh
aws rds modify-db-instance \
    --region {{region}} \
    --db-instance-identifier {{instance-id}} \
    --cloudwatch-logs-export-configuration '{"EnableLogTypes":["error","general","slowquery","audit"]}'
```

---

#### **PostgreSQL**

Enable export of PostgreSQL `postgresql` and `upgrade` logs:

```sh
aws rds modify-db-instance \
    --region {{region}} \
    --db-instance-identifier {{instance-id}} \
    --cloudwatch-logs-export-configuration '{"EnableLogTypes":["postgresql","upgrade"]}'
```

---

#### **SQL Server**

Enable export of SQL Server `error` and `agent` logs:

```sh
aws rds modify-db-instance \
    --region {{region}} \
    --db-instance-identifier {{instance-id}} \
    --cloudwatch-logs-export-configuration '{"EnableLogTypes":["error","agent"]}'
```

---

#### **Oracle**

Enable export of Oracle `alert`, `audit`, `listener`, and `trace` logs:

```sh
aws rds modify-db-instance \
    --region {{region}} \
    --db-instance-identifier {{instance-id}} \
    --cloudwatch-logs-export-configuration '{"EnableLogTypes":["alert","audit","listener","trace"]}'
```

### Considerations

- Supported log types vary by database engine and engine version.
- Once enabled, logs are continuously streamed to Amazon CloudWatch Logs for centralized storage and analysis.
- Additional CloudWatch costs may apply depending on log volume and retention settings.
