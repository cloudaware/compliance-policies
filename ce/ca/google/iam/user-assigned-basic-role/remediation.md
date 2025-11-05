# Remediation

## From Google Cloud Console

1. Navigate to **IAM & Admin → IAM**: [https://console.cloud.google.com/iam-admin/iam](https://console.cloud.google.com/iam-admin/iam)
2. Locate any members assigned the **Owner**, **Editor**, or **Viewer** roles.
3. Click the **Delete Bin** icon to remove the role from the member.
4. Assign a more granular role based on the user’s job responsibilities.

**Note:** Role removal should be guided by business requirements to ensure users retain necessary access.

## From gcloud CLI

1. **Remove the basic role from the user**:

    ```sh
    gcloud {{projects | organizations | resource-manager folders}} remove-iam-policy-binding {{resource-id}} \
        --member="user:{{user-email}}" \
        --role="{{roles/owner}}"
    ```

2. **Assign a least-privilege role appropriate for the user’s responsibilities**:

    ```sh
    gcloud {{projects | organizations | resource-manager folders}} add-iam-policy-binding {{resource-id}} \
        --member="user:{{user-email}}" \
        --role="{{least-privilege-role}}"
    ```
