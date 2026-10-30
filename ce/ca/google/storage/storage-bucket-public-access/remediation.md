# Remediation

## From Google Cloud Console

1. Go to `Storage browser` by visiting <https://console.cloud.google.com/storage/browser>.
2. Click on the bucket name to go to its `Bucket details` page.
3. Click on the `Permissions` tab.
4. Click `Delete` in front of `allUsers` and `allAuthenticatedUsers` to remove those role assignments.

## From Google Cloud CLI

Remove `allUsers` and `allAuthenticatedUsers` access.

```sh
gsutil iam ch -d allUsers gs://{{bucket-name}} 
gsutil iam ch -d allAuthenticatedUsers gs://{{bucket-name}}
```
