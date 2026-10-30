# Description

To prevent unnecessary project ownership assignments to users or service accounts and reduce misuse of projects and resources, all `roles/Owner` assignments should be monitored.

Members (users or service accounts) with a role assignment to the primitive role `roles/Owner` are project owners.

The project owner has full privileges on the project. These are summarized below:

- All viewer permissions on all GCP Services within the project
- Permissions for actions that modify the state of all GCP services within the project
- Manage roles and permissions for a project and all resources within the project
- Set up billing for a project

Granting the owner role to a member (user or service account) allows that member to modify the Identity and Access Management (IAM) policy. Therefore, grant the owner role only if the member has a legitimate purpose to manage the IAM policy. This is because the project IAM policy contains sensitive access control data. Having a minimal set of users allowed to manage IAM policy simplifies auditing.

## Rationale

Project ownership has the highest level of privileges on a project. To avoid misuse of project resources, the project ownership assignment and change actions mentioned above should be monitored and alerts sent to the appropriate recipients.

- Sending project ownership invites
- Acceptance/Rejection of project ownership invite by user
- Adding `roles/Owner` to a user or service account
- Removing a user or service account from `roles/Owner`

## Impact

Enabling logging may result in your project being charged for additional log usage.

## Audit

### From Google Cloud Console

Ensure that the prescribed log metric is present:

1. Go to `Logging/Log-based Metrics` by visiting <https://console.cloud.google.com/logs/metrics>.
2. In the `User-defined Metrics` section, ensure that at least one metric `{{log-metric-name}}` is present with filter text:

    (protoPayload.serviceName="cloudresourcemanager.googleapis.com")
    AND (ProjectOwnership OR projectOwnerInvitee)
    OR (protoPayload.serviceData.policyDelta.bindingDeltas.action="REMOVE"
    AND protoPayload.serviceData.policyDelta.bindingDeltas.role="roles/owner")
    OR (protoPayload.serviceData.policyDelta.bindingDeltas.action="ADD"
    AND protoPayload.serviceData.policyDelta.bindingDeltas.role="roles/owner")

Ensure that the prescribed Alerting Policy is present:

1. Go to `Alerting` by visiting <https://console.cloud.google.com/monitoring/alerting>.
2. Under the `Policies` section, ensure that at least one alert policy exists for the log metric above. Clicking on the policy should show that it is configured with a condition. For example, `Violates when: Any logging.googleapis.com/user/<Log Metric Name> stream is above a threshold of zero(0) for greater than zero(0) seconds` means that the alert will trigger for any new owner change. Verify that the chosen alerting thresholds make sense for your organization.
3. Ensure that the appropriate notifications channels have been set up.

### From Google Cloud CLI

Ensure that the prescribed log metric is present:

1. List the log metrics:

    ```sh
    gcloud logging metrics list \
        --format=json
    ```

2. Ensure that the output contains at least one metric with filter set to:

    ```txt
    (protoPayload.serviceName="cloudresourcemanager.googleapis.com")
    AND (ProjectOwnership OR projectOwnerInvitee)
    OR (protoPayload.serviceData.policyDelta.bindingDeltas.action="REMOVE"
    AND protoPayload.serviceData.policyDelta.bindingDeltas.role="roles/owner")
    OR (protoPayload.serviceData.policyDelta.bindingDeltas.action="ADD"
    AND protoPayload.serviceData.policyDelta.bindingDeltas.role="roles/owner")
    ```

3. Note the value of the property `metricDescriptor.type` for the identified metric, in the format `logging.googleapis.com/user/<Log Metric Name>`.

Ensure that the prescribed alerting policy is present:

1. List the alerting policies:

    ```sh
    gcloud alpha monitoring policies list \
        --format=json
    ```

2. Ensure that the output contains at least one alert policy where:

    - `conditions.conditionThreshold.filter` is set to `metric.type=\"logging.googleapis.com/user/<Log Metric Name>\"`

    - AND `enabled` is set to `true`

## References

1. <https://cloud.google.com/logging/docs/logs-based-metrics/>
2. <https://cloud.google.com/monitoring/custom-metrics/>
3. <https://cloud.google.com/monitoring/alerts/>
4. <https://cloud.google.com/logging/docs/reference/tools/gcloud-logging>

## Additional Information

1. Project ownership assignments for a user cannot be done using the gcloud utility as assigning project ownership to a user requires sending, and the user accepting, an invitation.
2. Project ownership assignment to a service account does not send any invites. SetIAMPolicy to role/owner is performed directly on service accounts.
