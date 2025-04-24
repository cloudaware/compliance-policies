# Description

User-managed service accounts should not have user-managed keys.

## Rationale

Anyone who has access to the keys will be able to access resources through the service account. GCP-managed keys are used by Cloud Platform services such as App Engine and Compute Engine. These keys cannot be downloaded. Google will keep the keys and automatically rotate them on an approximately weekly basis. User-managed keys are created, downloadable, and managed by users. They expire 10 years from creation.

For user-managed keys, the user has to take ownership of key management activities which include:

     • Key storage
     • Key distribution
     • Key revocation
     • Key rotation
     • Protecting the keys from unauthorized users
     • Key recovery

Even with key owner precautions, keys can be easily leaked by common development malpractices like checking keys into the source code or leaving them in the Downloads directory, or accidentally leaving them on support blogs/channels.

It is recommended to prevent user-managed service account keys.

## Impact

Deleting user-managed service account keys may break communication with the applications using the corresponding keys.

## Audit

### From Google Cloud Console

1. Go to the IAM page in the GCP Console using <https://console.cloud.google.com/iam-admin/iam>
2. In the left navigation pane, click `Service accounts`. All service accounts and their corresponding keys are listed.
3. Click the service accounts and check if keys exist.

### From Google Cloud CLI

List All the service accounts:

     gcloud iam service-accounts list

Identify user-managed service accounts which have an account `EMAIL` ending with `iam.gserviceaccount.com` For each user-managed service account, list the keys managed by the user:

     gcloud iam service-accounts keys list --iam-account=<Service Account> --managed-by=user

No keys should be listed.

## Prevention

You can disable service account key creation through the `Disable service account key creation` Organization policy by visiting <https://console.cloud.google.com/iam-admin/orgpolicies/iam-disableServiceAccountKeyCreation>.
Learn more at: <https://cloud.google.com/resource-manager/docs/organization-policy/restricting-service-accounts>
In addition, if you do not need to have service accounts in your project, you can also prevent the creation of service accounts through the `Disable service account creation` Organization policy: <https://console.cloud.google.com/iam-admin/orgpolicies/iam-disableServiceAccountCreation>.

## Default Value

By default, there are no user-managed keys created for user-managed service accounts.

## References

1. <https://cloud.google.com/iam/docs/understanding-service-accounts#managing_service_account_keys>
2. <https://cloud.google.com/resource-manager/docs/organization-policy/restricting-service-accounts>

## Additional Information

A user-managed key cannot be created on GCP-Managed Service Accounts.
