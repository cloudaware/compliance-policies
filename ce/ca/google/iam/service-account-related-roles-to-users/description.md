# Description

It is recommended that the principle of 'Separation of Duties' is enforced while assigning service-account related roles to users.

## Rationale

The built-in/predefined IAM role `Service Account admin` allows the user/identity to create, delete, and manage service account(s). The built-in/predefined IAM role `Service Account User` allows the user/identity (with adequate privileges on Compute and App Engine) to assign service account(s) to Apps/Compute Instances.

Separation of duties is the concept of ensuring that one individual does not have all necessary permissions to be able to complete a malicious action. In Cloud IAM - service accounts, this could be an action such as using a service account to access resources that user should not normally have access to.

Separation of duties is a business control typically used in larger organizations, meant to help avoid security or privacy incidents and errors. It is considered best practice.

No user should have `Service Account Admin` and `Service Account User` roles assigned at the same time.

## Impact

The removed role should be assigned to a different user based on business needs.

## Audit

### From Google Cloud Console

1. Go to `IAM & Admin/IAM` using <https://console.cloud.google.com/iam-admin/iam>.
2. Ensure no member has the roles `Service Account Admin` and `Service account User` assigned together.

### From Google Cloud CLI

1. List all users and role assignments:

    ```sh
    gcloud projects get-iam-policy [Project_ID] --format json | \ jq -r '[ (["Service_Account_Admin_and_User"] | (., map(length*"-"))), ( [ .bindings[] | select(.role == "roles/iam.serviceAccountAdmin" or .role == "roles/iam.serviceAccountUser").members[] ] | group_by(.) | map({User: ., Count: length}) | .[] | select(.Count == 2).User | unique ) ] | .[] | @tsv'
    ```

2. All common users listed under `Service_Account_Admin_and_User` are assigned both the `roles/iam.serviceAccountAdmin` and `roles/iam.serviceAccountUser roles`.

## References

1. <https://cloud.google.com/iam/docs/service-accounts>
2. <https://cloud.google.com/iam/docs/understanding-roles>
3. <https://cloud.google.com/iam/docs/granting-roles-to-service-accounts>

## Additional Information

Users granted with Owner (roles/owner) and Editor (roles/editor) have privileges equivalent to Service Account Admin and Service Account User. To avoid the misuse, Owner and Editor roles should be granted to very limited users and Use of these primitive privileges should be minimal. These requirements are addressed in separate recommendations.
