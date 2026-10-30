# Remediation

## From Google Cloud Console

1. Go to `Audit Logs` by visiting <https://console.cloud.google.com/iam-admin/audit>.
2. Follow the steps at <https://cloud.google.com/logging/docs/audit/configure-data-access> to enable audit logs for all Google Cloud services. Ensure that no exemptions are allowed.

## From Google Cloud CLI

1. To read the project's IAM policy and store it in a file, run:

    ```sh
    gcloud projects get-iam-policy {{project-id}} > /tmp/project_policy.yaml
    ```

    Alternatively, the policy can be set at the organization or folder level. If you set the policy at the organization level, it is not necessary to also set it for each folder or project.

    ```sh
    gcloud organizations get-iam-policy {{organization-id}} > /tmp/org_policy.yaml
    ```

    ```sh
    gcloud resource-manager folders get-iam-policy {{folder-id}} > /tmp/folder_policy.yaml
    ```

2. Edit the policy in `/tmp/policy.yaml`, adding or changing only the audit logs configuration to:

    Note: Admin Activity logs are enabled by default and cannot be disabled, so they are not listed in these configuration changes.

    auditConfigs:
    - auditLogConfigs:
    - logType: DATA_WRITE
    - logType: DATA_READ
    service: allServices

    Note: `exemptedMembers:` is not set because audit logging should be enabled for all users.

3. To write the updated IAM policy, run the appropriate command:

    ```sh
    gcloud organizations set-iam-policy {{organization-id}} /tmp/org_policy.yaml
    gcloud resource-manager folders set-iam-policy {{folder-id}} /tmp/folder_policy.yaml
    gcloud projects set-iam-policy {{project-id}} /tmp/project_policy.yaml
    ```

If the preceding command reports a conflict with another change, then repeat these steps, starting with the first step.
