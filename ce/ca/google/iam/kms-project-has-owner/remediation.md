# Remediation

## From Google Cloud Console

1. Navigate to **IAM & Admin - IAM**: [https://console.cloud.google.com/iam-admin/iam](https://console.cloud.google.com/iam-admin/iam)
2. Locate any principals (users, groups, or service accounts) assigned the **Owner (roles/owner)** role within the project.
3. Click the **Delete Bin** icon to remove the **Owner** role from the principal.
4. Assign a more granular role (e.g., **roles/editor**, **roles/viewer**, or a specific KMS-related predefined/custom role**) based on the user’s job responsibilities.

**Note:** Role removal should be performed carefully to ensure users retain the permissions necessary for their tasks.

## From gcloud CLI

1. **Remove the Owner role from the principal:**

    ```sh
    gcloud projects remove-iam-policy-binding {{project-id}} \
        --member="{{principal-type}}:{{principal-email}}" \
        --role="roles/owner"
    ```

2. **Assign a least-privilege role appropriate for the principal’s responsibilities:**

    ```sh
    gcloud projects add-iam-policy-binding {{project-id}} \
        --member="{{principal-type}}:{{principal-email}}" \
        --role="{{least-privilege-role}}"
    ```

**Note:** Replace `{{principal-type}}` with `user`, `group`, or `serviceAccount` as applicable.
