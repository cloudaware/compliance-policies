# Remediation

## From Google Cloud Console

1. Go to `Audit Logs` by visiting <https://console.cloud.google.com/iam-admin/audit>.
2. Follow the steps at <https://cloud.google.com/logging/docs/audit/configure-data-access> to enable audit logs for all Google Cloud services. Ensure that no exemptions are allowed.

## From Google Cloud CLI

1. To read the project's IAM policy and store it in a file run a command:

        gcloud projects get-iam-policy PROJECT_ID > /tmp/project_policy.yaml

    Alternatively, the policy can be set at the organization or folder level. If setting the policy at the organization level, it is not necessary to also set it for each folder or project.

        gcloud organizations get-iam-policy ORGANIZATION_ID > /tmp/org_policy.yaml
    
        gcloud resource-manager folders get-iam-policy FOLDER_ID > /tmp/folder_policy.yaml

2. Edit policy in /tmp/policy.yaml, adding or changing only the audit logs configuration to:

    Note: Admin Activity Logs are enabled by default, and cannot be disabled. So they are not listed in these configuration changes.

        auditConfigs: 
        - auditLogConfigs: 
        - logType: DATA_WRITE 
        - logType: DATA_READ 
        service: allServices

    Note: `exemptedMembers:` is not set as audit logging should be enabled for all the users

3. To write new IAM policy run command:

        gcloud organizations set-iam-policy ORGANIZATION_ID /tmp/org_policy.yaml gcloud resource-manager folders set-iam-policy FOLDER_ID /tmp/folder_policy.yaml
        gcloud projects set-iam-policy PROJECT_ID /tmp/project_policy.yaml

If the preceding command reports a conflict with another change, then repeat these steps, starting with the first step.
