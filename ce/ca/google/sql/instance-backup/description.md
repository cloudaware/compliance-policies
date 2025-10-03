# Description

It is recommended to have all SQL database instances set to enable automated backups.

## Rationale

Backups provide a way to restore a Cloud SQL instance to recover lost data or recover from a problem with that instance. Automated backups need to be set for any instance that contains data that should be protected from loss or damage. This recommendation is applicable for SQL Server, PostgreSql, MySql generation 1 and MySql generation 2 instances.

## Impact

Automated Backups will increase required size of storage and costs associated with it.

## Audit

### From Google Cloud Console

1. Go to the Cloud SQL Instances page in the Google Cloud Console by visiting <https://console.cloud.google.com/sql/instances>.
2. Click the instance name to open its instance details page.
3. Go to the `Backups` menu.
4. Ensure that `Automated backups` is set to `Enabled` and `Backup time` is mentioned.

### From Google Cloud CLI

1. List all Cloud SQL database instances using the following command:

```sh
gcloud sql instances list --format=json | jq '. | map(select(.instanceType != "READ_REPLICA_INSTANCE")) | .[].name'
```

NOTE: gcloud command has been added with the filter to exclude read-replicas instances, as GCP do not provide Automated Backups for read-replica instances.
2. Ensure that the below command returns `True` for every Cloud SQL database instance.

```sh
gcloud sql instances describe <INSTANCE_NAME> --format="value('Enabled':settings.backupConfiguration.enabled)"
```

## Default Value

By default, automated backups are not configured for Cloud SQL instances. Data backup is not possible on any Cloud SQL instance unless Automated Backup is configured.

## References

1. <https://cloud.google.com/sql/docs/mysql/backup-recovery/backups>
2. <https://cloud.google.com/sql/docs/postgres/backup-recovery/backing-up>
