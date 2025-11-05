# Remediation

## From Google Cloud Console

1. Navigate to **IAM & Admin - IAM**: [https://console.cloud.google.com/iam-admin/iam](https://console.cloud.google.com/iam-admin/iam)
2. Identify any principals (users, groups, or service accounts) assigned the Redis roles (**roles/redis.admin**, **roles/redis.editor**, **roles/redis.viewer**) at the organization level.
3. Click the **Delete Bin** icon to remove the role from the principal.
4. Assign Redis roles scoped only to the projects where Redis instances exist and management is required.

**Note:** Changes should be guided by business requirements to ensure principals retain necessary permissions.

## From gcloud CLI

1. **Remove the organization-level Redis role from the principal:**

    ```sh
    gcloud organizations remove-iam-policy-binding {{organization-id}} \
        --member="{{principal-type}}:{{principal-email}}" \
        --role="{{roles/redis.admin}}"
    ```

2. **Assign a project-scoped Redis role appropriate for the principal’s responsibilities:**

    ```sh
    gcloud projects add-iam-policy-binding {{project-id}} \
        --member="{{principal-type}}:{{principal-email}}" \
        --role="{{roles/redis.admin}}"
    ```

**Note:** Replace `{{principal-type}}` with `user`, `group`, or `serviceAccount` as appropriate. Repeat for other Redis roles as needed.
