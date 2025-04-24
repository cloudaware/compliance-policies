# Remediation

## From Google Cloud Console

### Create the prescribed log metric

1. Go to `Logging/Logs-based Metrics` by visiting <https://console.cloud.google.com/logs/metrics> and click "CREATE METRIC".
2. Click the down arrow symbol on the `Filter Bar` at the rightmost corner and select `Convert to Advanced Filter`.
3. Clear any text and add:

        (protoPayload.serviceName="cloudresourcemanager.googleapis.com")
        AND (ProjectOwnership OR projectOwnerInvitee)
        OR (protoPayload.serviceData.policyDelta.bindingDeltas.action="REMOVE"
        AND protoPayload.serviceData.policyDelta.bindingDeltas.role="roles/owner")
        OR (protoPayload.serviceData.policyDelta.bindingDeltas.action="ADD"
        AND protoPayload.serviceData.policyDelta.bindingDeltas.role="roles/owner")

4. Click `Submit Filter`. The logs display based on the filter text entered by the user.
5. In the `Metric Editor` menu on the right, fill out the name field. Set `Units` to `1` (default) and the `Type` to `Counter`. This ensures that the log metric counts the number of log entries matching the advanced logs query.
6. Click `Create Metric`.

### Create the display prescribed Alert Policy

1. Identify the newly created metric under the section `User-defined Metrics` at <https://console.cloud.google.com/logs/metrics>.
2. Click the 3-dot icon in the rightmost column for the desired metric and select `Create alert from Metric`. A new page opens.
3. Fill out the alert policy configuration and click `Save`. Choose the alerting threshold and configuration that makes sense for the user's organization. For example, a threshold of zero(0) for the most recent value will ensure that a notification is
triggered for every owner change in the project:

         Set `Aggregator` to `Count` 
         Set `Configuration`:
          - Condition: above 
          - Threshold: 0 
          - For: most recent value

4. Configure the desired notifications channels in the section `Notifications`.
5. Name the policy and click `Save`.

## From Google Cloud CLI

Create a prescribed Log Metric:

    • Use the command: gcloud beta logging metrics create
    • Reference for Command Usage: <https://cloud.google.com/sdk/gcloud/reference/beta/logging/metrics/create>

Create prescribed Alert Policy

    • Use the command: gcloud alpha monitoring policies create
    • Reference for Command Usage: <https://cloud.google.com/sdk/gcloud/reference/alpha/monitoring/policies/create>
