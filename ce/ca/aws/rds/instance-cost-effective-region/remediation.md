# Remediation

## Key Considerations

- Coordinate migration with application and database owners to minimize downtime.
- Identify all dependent components (EC2, Lambda, VPC, networking, etc.) that may also need to move.
- Select the migration approach based on engine type, business tolerance for downtime, and replication support.

## Summary Table

| Migration Approach                         | Amazon RDS for MySQL| Amazon RDS for MariaDB| Amazon RDS for PostgreSQL| Amazon Aurora MySQL| Amazon Aurora PostgreSQL|
| ------------------------------------------ | ------------------- | --------------------- | ------------------------ | ------------------ | ----------------------- |
| Snapshot Restore for Cross-Region Migration| Supported           | Supported             | Supported                | Supported          | Supported               |
| Read Replica for Cross-Region Migration    | Supported           | Supported             | Supported                | Supported          | Not Supported           |
| Aurora Global Database                     | Not Supported       | Not Supported         | Not Supported            | Supported          | Supported               |

## From Command Line

### Option 1: **Snapshot Restore for Cross-Region Migration**

Create a snapshot in the source Region:

```sh
aws rds create-db-snapshot \
    --db-instance-identifier {{db-instance-id}} \
    --db-snapshot-identifier {{snapshot-name}}
```

Copy the snapshot to the target Region:

```sh
aws rds copy-db-snapshot \
    --source-region {{source-region}} \
    --source-db-snapshot-identifier {{snapshot-name}} \
    --target-db-snapshot-identifier {{copied-snapshot-name}} \
    --region {{target-region}}
    --copy-tags
```

Restore the DB instance in the target Region:

```sh
aws rds restore-db-instance-from-db-snapshot \
    --db-instance-identifier {{target-db-instance-id}} \
    --db-snapshot-identifier {{copied-snapshot-name}} \
    --region {{target-region}}
```

---

### Option 2: **Read Replica for Cross-Region Migration**

Create a cross-Region read replica:

```sh
aws rds create-db-instance-read-replica \
    --db-instance-identifier {{replica-db-instance-id}} \
    --source-db-instance-identifier {{db-instance-id}} \
    --region {{target-region}} \
    --source-region {{source-region}} \
    --db-instance-class {{instance-class}}
```

Promote the replica to a standalone DB:

```sh
aws rds promote-read-replica \
    --db-instance-identifier {{replica-db-instance-id}} \
```

This approach enables **low-downtime migration** once replication is caught up.

---

### Option 3: **Aurora Global Database**

- Add the target Region as a secondary cluster in the Aurora Global Database.
- Once synchronized, perform a **managed planned failover** to make the target Region the primary.

This method delivers **minimal downtime and RPO = 0**.
