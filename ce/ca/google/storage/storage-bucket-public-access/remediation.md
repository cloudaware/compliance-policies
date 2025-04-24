# Remediation

## From Google Cloud Console

1. Go to `Storage browser` by visiting <https://console.cloud.google.com/storage/browser>.
2. Click on the bucket name to go to its `Bucket details` page.
3. Click on the `Permissions` tab.
4. Click `Delete` button in front of `allUsers` and `allAuthenticatedUsers` to remove that particular role assignment.

## From Google Cloud CLI

Remove `allUsers` and `allAuthenticatedUsers` access.

            gsutil iam ch -d allUsers gs://BUCKET_NAME 
            gsutil iam ch -d allAuthenticatedUsers gs://BUCKET_NAME
