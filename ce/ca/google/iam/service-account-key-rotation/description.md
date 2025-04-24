# Description

Service Account keys consist of a key ID (Private_key_Id) and Private key, which are used to sign programmatic requests users make to Google cloud services accessible to that particular service account. It is recommended that all Service Account keys are regularly rotated.

## Rationale

Rotating Service Account keys will reduce the window of opportunity for an access key that is associated with a compromised or terminated account to be used. Service Account keys should be rotated to ensure that data cannot be accessed with an old key that might have been lost, cracked, or stolen.

Each service account is associated with a key pair managed by Google Cloud Platform (GCP). It is used for service-to-service authentication within GCP. Google rotates the keys daily.

GCP provides the option to create one or more user-managed (also called external key pairs) key pairs for use from outside GCP (for example, for use with Application Default Credentials). When a new key pair is created, the user is required to download the private key (which is not retained by Google). With external keys, users are responsible for keeping the private key secure and other management operations such as key rotation. External keys can be managed by the IAM API, gcloud command-line tool, or the Service Accounts page in the Google Cloud Platform Console. GCP facilitates up to 10 external service account keys per service account to facilitate key rotation.

## Impact

Rotating service account keys will break communication for dependent applications. Dependent applications need to be configured manually with the new key `ID` displayed in the `Service account keys` section and the `private key` downloaded by the user.

## Audit

### From Google Cloud Console

1. Go to `APIs & Services\Credentials` using <https://console.cloud.google.com/apis/credentials>
2. In the section `Service Account Keys`, for every External (user-managed) service account key listed ensure the `creation date` is within the past 90 days.

## From Google Cloud CLI

1. List all Service accounts from a project.

     gcloud iam service-accounts list

2. For every service account list service account keys.

     gcloud iam service-accounts keys list --iam-account [Service_Account_Email_Id] --format=json

3. Ensure every service account key for a service account has a `"validAfterTime"` value within the past 90 days.

## Default Value

GCP does not provide an automation option for External (user-managed) Service key rotation.

## References

1. <https://cloud.google.com/iam/docs/understanding-service-accounts#managing_service_account_keys>
2. <https://cloud.google.com/sdk/gcloud/reference/iam/service-accounts/keys/list>
3. <https://cloud.google.com/iam/docs/service-accounts>

## Additional Information

For user-managed Service Account key(s), key management is entirely the user's responsibility.
