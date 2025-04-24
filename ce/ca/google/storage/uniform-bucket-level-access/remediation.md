# Remediation

## From Google Cloud Console

1. Open the Cloud Storage browser in the Google Cloud Console by visiting: <https://console.cloud.google.com/storage/browser>
2. In the list of buckets, click on the name of the desired bucket.
3. Select the `Permissions` tab near the top of the page.
4. In the text box that starts with `This bucket uses fine-grained access control...`, click `Edit`.
5. In the pop-up menu that appears, select `Uniform`.
6. Click `Save`.

## From Google Cloud CLI

Use the on option in a uniformbucketlevelaccess set command:

            gsutil uniformbucketlevelaccess set on gs://BUCKET_NAME/
