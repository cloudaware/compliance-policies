# Remediation

## From Google Cloud Console

1. Go to the IAM page in the GCP Console using <https://console.cloud.google.com/iam-admin/iam>
2. In the left navigation pane, click `Service accounts`. All service accounts and their corresponding keys are listed.
3. Click the service account.
4. Click the `edit` and delete the keys.

## From Google Cloud CLI

To delete a user managed Service Account Key:

    gcloud iam service-accounts keys delete --iam-account=<user-managed-service-account-EMAIL> <KEY-ID>
