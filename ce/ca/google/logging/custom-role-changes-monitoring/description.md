# Description

It is recommended that a metric filter and alarm be established for changes to Identity and Access Management (IAM) role creation, deletion and updating activities.

## Rationale

Google Cloud IAM provides predefined roles that give granular access to specific Google Cloud Platform resources and prevent unwanted access to other resources. However, to cater to organization-specific needs, Cloud IAM also provides the ability to create custom roles. Project owners and administrators with the Organization Role Administrator role or the IAM Role Administrator role can create custom roles. Monitoring role creation, deletion and updating activities will help in identifying any over-privileged role at early stages.

## Impact

Enabling of logging may result in your project being charged for the additional logs usage.

## Audit

### From Google Cloud Console

Ensure that the prescribed log metric is present:

1. Go to `Logging/Logs-based Metrics` by visiting <https://console.cloud.google.com/logs/metrics>.
2. In the `User-defined Metrics` section, ensure that at least one metric `<Log_Metric_Name>` is present with filter text:

        resource.type="iam_role" 
        AND (protoPayload.methodName="google.iam.admin.v1.CreateRole" 
        OR protoPayload.methodName="google.iam.admin.v1.DeleteRole" 
        OR protoPayload.methodName="google.iam.admin.v1.UpdateRole")

Ensure that the prescribed alerting policy is present:

1. Go to `Alerting` by visiting <https://console.cloud.google.com/monitoring/alerting>.
2. Under the `Policies` section, ensure that at least one alert policy exists for the log metric above. Clicking on the policy should show that it is configured with a condition. For example, `Violates when: Any logging.googleapis.com/user/<Log Metric Name> stream is above a threshold of zero(0) for greater than zero(0) seconds` means that the alert will trigger for any new owner change. Verify that the chosen alerting thresholds make sense for the user's organization.
3. Ensure that the appropriate notifications channels have been set up.

### From Google Cloud CLI

Ensure that the prescribed log metric is present:

1. List the log metrics:

        gcloud logging metrics list --format json

2. Ensure that the output contains at least one metric with the filter set to:

        resource.type="iam_role" 
        AND (protoPayload.methodName = "google.iam.admin.v1.CreateRole" 
        OR protoPayload.methodName="google.iam.admin.v1.DeleteRole" 
        OR protoPayload.methodName="google.iam.admin.v1.UpdateRole")

3. Note the value of the property `metricDescriptor.type` for the identified metric, in the format `logging.googleapis.com/user/<Log Metric Name>`.

Ensure that the prescribed alerting policy is present:

1. List the alerting policies:

    gcloud alpha monitoring policies list --format json

2. Ensure that the output contains an least one alert policy where:

    • `conditions.conditionThreshold.filter` is set to `metric.type=\"logging.googleapis.com/user/<Log Metric Name>\"`

    • AND `enabled` is set to `true`.

## References

1. <https://cloud.google.com/logging/docs/logs-based-metrics/>
2. <https://cloud.google.com/monitoring/custom-metrics/>
3. <https://cloud.google.com/monitoring/alerts/>
4. <https://cloud.google.com/logging/docs/reference/tools/gcloud-logging>
5. <https://cloud.google.com/iam/docs/understanding-custom-roles>
