# Remediation

## From Google Cloud Console

1. Go to the Cloud SQL Instances page in the Google Cloud Console by visiting <https://console.cloud.google.com/sql/instances>.
2. Select the instance where the backups need to be configured.
3. Click `Edit`.
4. In the `Backups` section, check `Enable automated backups`, and choose a backup window.
5. Click `Save`.

## From Google Cloud CLI

1. List all Cloud SQL database instances using the following command:

            gcloud sql instances list --format=json | jq '. | map(select(.instanceType != "READ_REPLICA_INSTANCE")) | .[].name'

NOTE: gcloud command has been added with the filter to exclude read-replicas instances, as GCP do not provide Automated Backups for read-replica instances.
2. Enable Automated backups for every Cloud SQL database instance using the below command:

            gcloud sql instances patch <INSTANCE_NAME> --backup-start-time <[HH:MM]>

The `backup-start-time` parameter is specified in 24-hour time, in the UTC±00 time zone, and specifies the start of a 4-hour backup window. Backups can start any time during the backup window.
