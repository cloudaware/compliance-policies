# Remediation

To reduce operational costs, migrate DynamoDB tables from higher-cost regions to more cost-efficient alternatives. DynamoDB does not support direct table moves across regions. The recommended approaches are:

- **DynamoDB Global Tables**
- **Point-in-Time Recovery (PITR)**

## Migrate Using DynamoDB Global Tables

1. Enable streams on the existing table:

```sh
aws dynamodb update-table \
    --table-name {{table-name}} \
    --stream-specification StreamEnabled=true,StreamViewType=NEW_AND_OLD_IMAGES
```

2. Add replication to a new region:

```sh
aws dynamodb update-table --table-name {{table-name}} --cli-input-json \
'{
  "ReplicaUpdates":
  [
    {
      "Create": {
        "RegionName": "{{target-region}}"
      }
    }
  ]
}' \
--region region
```

3. Once data is synchronized, update applications to use the new region and optionally remove the old replica:

```sh
aws dynamodb update-table --table-name {{table-name}} --cli-input-json \
'{
  "ReplicaUpdates":
  [
    {
      "Delete": {
        "RegionName": "{{source-region}}"
      }
    }
  ]
}' \
--region us-east-2
```

**Note**: Validate application functionality and data integrity before decommissioning the original table.

## Migrate Using Point-in-Time Recovery (PITR)

1. Enable PITR on the source table (if not already enabled):

```sh
aws dynamodb update-continuous-backups \
    --table-name {{table-name}} \
    --point-in-time-recovery-specification PointInTimeRecoveryEnabled=true
```

2. Restore the table to a new table in the target region using PITR:

```sh
aws dynamodb restore-table-to-point-in-time \
    --source-table-name {{table-name}} \
    --target-table-name {{new-table-name}} \
    --use-latest-restorable-time \
    --region {{target-region}}
```

3. Update applications or services to point to the new table in the target region.

4. Decommission the original table once migration is validated:

```sh
aws dynamodb delete-table \
    --table-name {{table-name}} \
    --region {{source-region}}
```

**Note**: Validate application functionality and data integrity before decommissioning the original table.
