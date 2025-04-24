# Description

It is recommended that a metric filter and alarm be established for SQL instance configuration changes.

## Rationale

Monitoring changes to SQL instance configuration changes may reduce the time needed to detect and correct misconfigurations done on the SQL server.

Below are a few of the configurable options which may the impact security posture of an SQL instance:

    • Enable auto backups and high availability: Misconfiguration may adversely impact business continuity, disaster recovery, and high availability
    • Authorize networks: Misconfiguration may increase exposure to untrusted networks

## Impact

Enabling of logging may result in your project being charged for the additional logs usage. These charges could be significant depending on the size of the organization.

## Audit

### From Google Cloud Console

Ensure the prescribed log metric is present:

1. For each project that contains Cloud SQL instances, go to `Logging/Logs-based Metrics` by visiting <https://console.cloud.google.com/logs/metrics>.
2. In the `User-defined Metrics` section, ensure that at least one metric `<Log_Metric_Name>` is present with the filter text:

            protoPayload.methodName="cloudsql.instances.update"

    Ensure that the prescribed alerting policy is present:

3. Go to `Alerting` by visiting <https://console.cloud.google.com/monitoring/alerting>.
4. Under the `Policies` section, ensure that at least one alert policy exists for the log metric above. Clicking on the policy should show that it is configured with a condition. For example, `Violates when: Any logging.googleapis.com/user/<Log Metric Name> stream is above a threshold of zero(0) for greater than zero(0) seconds` means that the alert will trigger for any new owner change. Verify that the chosen alerting thresholds make sense for the user's organization.
5. Ensure that the appropriate notifications channels have been set up.

### From Google Cloud CLI

Ensure that the prescribed log metric is present:

1. List the log metrics:

            gcloud logging metrics list --format json

2. Ensure that the output contains at least one metric with the filter set to

            protoPayload.methodName="cloudsql.instances.update"

3. Note the value of the property `metricDescriptor.type` for the identified metric, in the format `logging.googleapis.com/user/<Log Metric Name>`.

    Ensure that the prescribed alerting policy is present:

4. List the alerting policies:

            gcloud alpha monitoring policies list --format json

5. Ensure that the output contains at least one alert policy where:
• `conditions.conditionThreshold.filter` is set to `metric.type=\"logging.googleapis.com/user/<Log Metric Name>\"`
• AND `enabled` is set to `true`

## References

1. <https://cloud.google.com/logging/docs/logs-based-metrics/>
2. <https://cloud.google.com/monitoring/custom-metrics/>
3. <https://cloud.google.com/monitoring/alerts/>
4. <https://cloud.google.com/logging/docs/reference/tools/gcloud-logging>
5. <https://cloud.google.com/storage/docs/overview>
6. <https://cloud.google.com/sql/docs/>
7. <https://cloud.google.com/sql/docs/mysql/>
8. <https://cloud.google.com/sql/docs/postgres/>
