# Remediation

## From Google Cloud Console

1. Go to `Logs Router` by visiting <https://console.cloud.google.com/logs/router>.
2. Click on the arrow symbol with `CREATE SINK` text.
3. Fill out the fields for `Sink details`.
4. Choose Cloud Logging bucket in the Select sink destination drop down menu.
5. Choose a log bucket in the next drop down menu.
6. If an inclusion filter is not provided for this sink, all ingested logs will be routed to the destination provided above. This may result in higher than expected resource usage.
7. Click `Create Sink`.

For more information, see <https://cloud.google.com/logging/docs/export/configure_export_v2#dest-create>.

## From Google Cloud CLI

To create a sink to export all log entries in a Google Cloud Storage bucket:

    gcloud logging sinks create <sink-name> storage.googleapis.com/DESTINATION_BUCKET_NAME

Sinks can be created for a folder or organization, which will include all projects.

    gcloud logging sinks create <sink-name> storage.googleapis.com/DESTINATION_BUCKET_NAME --include-children --folder=FOLDER_ID | --organization=ORGANIZATION_ID

## Note

1. A sink created by the command-line above will export logs in storage buckets. However, sinks can be configured to export logs into BigQuery, or Cloud Pub/Sub, or `Custom Destination`.
2. While creating a sink, the sink option `--log-filter` is not used to ensure the sink exports all log entries.
3. A sink can be created at a folder or organization level that collects the logs of all the projects underneath bypassing the option `--include-children` in the gcloud command.
