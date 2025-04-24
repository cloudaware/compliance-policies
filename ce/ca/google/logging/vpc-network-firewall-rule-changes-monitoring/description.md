# Description

It is recommended that a metric filter and alarm be established for Virtual Private Cloud (VPC) Network Firewall rule changes.

## Rationale

Monitoring for Create or Update Firewall rule events gives insight to network access changes and may reduce the time it takes to detect suspicious activity.

## Impact

Enabling of logging may result in your project being charged for the additional logs usage. These charges could be significant depending on the size of the organization.

## Audit

### From Google Cloud Console

Ensure that the prescribed log metric is present:

1. Go to `Logging/Logs-based Metrics` by visiting <https://console.cloud.google.com/logs/metrics>.
2. In the `User-defined Metrics` section, ensure at least one metric `<Log_Metric_Name>` is present with this filter text:

        resource.type="gce_firewall_rule" 
        AND (protoPayload.methodName:"compute.firewalls.patch" 
        OR protoPayload.methodName:"compute.firewalls.insert" 
        OR protoPayload.methodName:"compute.firewalls.delete")

Ensure that the prescribed alerting policy is present:

1. Go to `Alerting` by visiting <https://console.cloud.google.com/monitoring/alerting>.
2. Under the `Policies` section, ensure that at least one alert policy exists for the log metric above. Clicking on the policy should show that it is configured with a condition. For example, `Violates when: Any logging.googleapis.com/user/<Log Metric Name> stream is above a threshold of zero(0) for greater than zero(0) seconds` means that the alert will trigger for any new owner change. Verify that the chosen alerting thresholds make sense for the user's organization.
3. Ensure that appropriate notification channels have been set up.

### From Google Cloud CLI

Ensure that the prescribed log metric is present:

1. List the log metrics:

        gcloud logging metrics list --format json

2. Ensure that the output contains at least one metric with the filter set to:

         resource.type="gce_firewall_rule" 
         AND (protoPayload.methodName:"compute.firewalls.patch" 
         OR protoPayload.methodName:"compute.firewalls.insert" 
         OR protoPayload.methodName:"compute.firewalls.delete")

3. Note the value of the property `metricDescriptor.type` for the identified metric, in the format `logging.googleapis.com/user/<Log Metric Name>`.

Ensure that the prescribed alerting policy is present:

1. List the alerting policies:

        gcloud alpha monitoring policies list --format json

2. Ensure that the output contains an least one alert policy where:

    • `conditions.conditionThreshold.filter` is set to `metric.type=\"logging.googleapis.com/user/<Log Metric Name>\"`

    • AND `enabled` is set to `true`

## References

1. <https://cloud.google.com/logging/docs/logs-based-metrics/>
2. <https://cloud.google.com/monitoring/custom-metrics/>
3. <https://cloud.google.com/monitoring/alerts/>
4. <https://cloud.google.com/logging/docs/reference/tools/gcloud-logging>
5. <https://cloud.google.com/vpc/docs/firewalls>
