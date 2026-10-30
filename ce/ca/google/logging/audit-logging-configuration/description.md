# Description

It is recommended to configure Cloud Audit Logging to track all admin activities and read/write access to user data.

## Rationale

Cloud Audit Logging maintains two audit logs for each project, folder, and organization: Admin Activity and Data Access.

1. Admin Activity logs contain log entries for API calls or other administrative actions that modify the configuration or metadata of resources. Admin Activity audit logs are enabled for all services and cannot be configured.
2. Data Access audit logs record API calls that create, modify, or read user-provided data. These are disabled by default and should be enabled.

    There are three kinds of Data Access audit log information:

    - Admin read: Records operations that read metadata or configuration information. Admin Activity audit logs record writes of metadata and configuration information that cannot be disabled.
    - Data read: Records operations that read user-provided data.
    - Data write: Records operations that write user-provided data.

It is recommended to have a default audit configuration that:

1. `logType` is set to `DATA_READ` (to log user activity) and `DATA_WRITE` (to log changes or tampering to user data).
2. audit config is enabled for all the services supported by the Data Access audit logs feature.
3. Logs should be captured for all users. This means there are no exempted users in any audit config section, which ensures overrides do not contradict the requirement.

## Impact

There is no charge for Admin Activity audit logs. Enabling Data Access audit logs might result in your project being charged for additional log usage.

## Audit

### From Google Cloud Console

1. Go to `Audit Logs` by visiting <https://console.cloud.google.com/iam-admin/audit>.
2. Ensure that Admin Read, Data Write, and Data Read are enabled for all Google Cloud services and that no exemptions are allowed.

### From Google Cloud CLI

1. List the Identity and Access Management (IAM) policies for the project, folder, or organization:

    ```sh
    gcloud organizations get-iam-policy {{organization-id}}
    ```

    ```sh
    gcloud resource-manager folders get-iam-policy {{folder-id}}
    ```

    ```sh
    gcloud projects get-iam-policy {{project-id}}
    ```

2. The policy should have a default auditConfigs section with `logType` set to `DATA_WRITE` and `DATA_READ` for all services. Note that projects inherit settings from folders, which in turn inherit settings from the organization. When you call `projects get-iam-policy`, the result shows only the policies set in the project, not the policies inherited from the parent folder or organization. Nevertheless, if the parent folder has Cloud Audit Logging enabled, the project does as well.

    Sample output for default audit configs may look like this:

    ```txt
    auditConfigs:
        - auditLogConfigs:
        - logType: ADMIN_READ
        - logType: DATA_WRITE
        - logType: DATA_READ
        service: allServices
    ```

3. No auditConfigs section should have the parameter `exemptedMembers:` set, which ensures that logging is enabled for all users and no user is exempted.

## Default Value

Admin Activity logs are always enabled and cannot be disabled. Data Access audit logs are disabled by default because they can be quite large.

## References

1. <https://cloud.google.com/logging/docs/audit/>
2. <https://cloud.google.com/logging/docs/audit/configure-data-access>

## Additional Information

- Log type `DATA_READ` is as important as `DATA_WRITE` to track detailed user activities.

- BigQuery Data Access logs are handled differently from other data access logs. BigQuery logs are enabled by default and cannot be disabled. They do not count against logs allotment and cannot result in extra logs charges.
