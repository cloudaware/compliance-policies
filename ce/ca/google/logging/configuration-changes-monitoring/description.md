# Description

Google Cloud Platform (GCP) services write audit log entries to the Admin Activity and Data Access logs to help answer the questions of, "who did what, where, and when?" within GCP projects.

Cloud audit logging records information includes the identity of the API caller, the time of the API call, the source IP address of the API caller, the request parameters, and the response elements returned by GCP services. Cloud audit logging provides a history of GCP API calls for an account, including API calls made via the console, SDKs, command-line tools, and other GCP services.

## Rationale

Admin activity and data access logs produced by cloud audit logging enable security analysis, resource change tracking, and compliance auditing.

Configuring the metric filter and alerts for audit configuration changes ensures the recommended state of audit configuration is maintained so that all activities in the project are audit-able at any point in time.

## Impact

Enabling of logging may result in your project being charged for the additional logs usage.

## Audit

### From Google Cloud Console

Ensure the prescribed log metric is present:

1. Go to `Logging/Logs-based Metrics` by visiting <https://console.cloud.google.com/logs/metrics>.
2. In the `User-defined Metrics` section, ensure that at least one metric `<Log_Metric_Name>` is present with the filter text:

        protoPayload.methodName="SetIamPolicy" 
        AND protoPayload.serviceData.policyDelta.auditConfigDeltas:*

Ensure that the prescribed alerting policy is present:

1. Go to `Alerting` by visiting <https://console.cloud.google.com/monitoring/alerting>.
2. Under the `Policies` section, ensure that at least one alert policy exists for the log metric above. Clicking on the policy should show that it is configured with a condition. For example, `Violates when: Any logging.googleapis.com/user/<Log Metric Name> stream is above a threshold of 0 for greater than zero(0) seconds`, means that the alert will trigger for any new owner change. Verify that the chosen alerting thresholds make sense for the user's organization.
3. Ensure that appropriate notifications channels have been set up.

### From Google Cloud CLI

Ensure that the prescribed log metric is present:

1. List the log metrics:

        gcloud beta logging metrics list --format json

2. Ensure that the output contains at least one metric with the filter set to:

        protoPayload.methodName="SetIamPolicy" 
        AND protoPayload.serviceData.policyDelta.auditConfigDeltas:*

3. Note the value of the property `metricDescriptor.type` for the identified metric, in the format `logging.googleapis.com/user/<Log Metric Name>`.

Ensure that the prescribed alerting policy is present:

1. List the alerting policies:

        gcloud alpha monitoring policies list --format json

2. Ensure that the output contains at least one alert policy where:

    • `conditions.conditionThreshold.filter` is set to `metric.type=\"logging.googleapis.com/user/<Log Metric Name>\"`

    • AND `enabled` is set to `true`

## References

1. <https://cloud.google.com/logging/docs/logs-based-metrics/>
2. <https://cloud.google.com/monitoring/custom-metrics/>
3. <https://cloud.google.com/monitoring/alerts/>
4. <https://cloud.google.com/logging/docs/reference/tools/gcloud-logging>
5. <https://cloud.google.com/logging/docs/audit/configure-data-access#getiampolicy-setiampolicy>
