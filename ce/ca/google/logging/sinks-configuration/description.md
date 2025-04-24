# Description

It is recommended to create a sink that will export copies of all the log entries. This can help aggregate logs from multiple projects and export them to a Security Information and Event Management (SIEM).

## Rationale

Log entries are held in Cloud Logging. To aggregate logs, export them to a SIEM. To keep them longer, it is recommended to set up a log sink. Exporting involves writing a filter that selects the log entries to export, and choosing a destination in Cloud Storage, BigQuery, or Cloud Pub/Sub. The filter and destination are held in an object called a sink. To ensure all log entries are exported to sinks, ensure that there is no filter configured for a sink. Sinks can be created in projects, organizations, folders, and billing accounts.

## Impact

There are no costs or limitations in Cloud Logging for exporting logs, but the export destinations charge for storing or transmitting the log data.

## Audit

### From Google Cloud Console

1. Go to `Logs Router` by visiting <https://console.cloud.google.com/logs/router>.
2. For every sink, click the 3-dot button for Menu options and select `View sink details`.
3. Ensure there is at least one sink with an `empty` Inclusion filter.
4. Additionally, ensure that the resource configured as `Destination` exists.

### From Google Cloud CLI

1. Ensure that a sink with an `empty filter` exists. List the sinks for the project, folder or organization. If sinks are configured at a folder or organization level, they do not need to be configured for each project:

        gcloud logging sinks list --folder=FOLDER_ID | --organization=ORGANIZATION_ID | --project=PROJECT_ID

    The output should list at least one sink with an `empty filter`.

2. Additionally, ensure that the resource configured as `Destination` exists.

See <https://cloud.google.com/sdk/gcloud/reference/beta/logging/sinks/list> for more information.

## Default Value

By default, there are no sinks configured.

## References

1. <https://cloud.google.com/logging/docs/reference/tools/gcloud-logging>
2. <https://cloud.google.com/logging/quotas>
3. <https://cloud.google.com/logging/docs/routing/overview>
4. <https://cloud.google.com/logging/docs/export/using_exported_logs>
5. <https://cloud.google.com/logging/docs/export/configure_export_v2>
6. <https://cloud.google.com/logging/docs/export/aggregated_exports>
7. <https://cloud.google.com/sdk/gcloud/reference/beta/logging/sinks/list>

## Additional Information

For Command-Line Audit and Remediation, the sink destination of type `Cloud Storage Bucket` is considered. However, the destination could be configured to `Cloud Storage Bucket` or `BigQuery` or `Cloud Pub\Sub` or `Custom Destination`. Command Line Interface commands would change accordingly.
