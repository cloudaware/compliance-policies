# Remediation

## From Google Cloud Console

1. If sinks are not configured, first follow the instructions in the recommendation: `Ensure that sinks are configured for all Log entries`.
2. For each storage bucket configured as a sink, go to the Cloud Storage browser at `https://console.cloud.google.com/storage/browser/<BUCKET_NAME>`.
3. Select the Bucket Lock tab near the top of the page.
4. In the Retention policy entry, click the Add Duration link. The `Set a retention policy` dialog box appears.
5. Enter the desired length of time for the retention period and click `Save policy`.
6. Set the `Lock status` for this retention policy to `Locked`.

## From Google Cloud CLI

1. To list all sinks destined to storage buckets:

        gcloud logging sinks list --folder=FOLDER_ID | --organization=ORGANIZATION_ID | --project=PROJECT_ID

2. For each storage bucket listed above, set a retention policy and lock it:

        gsutil retention set [TIME_DURATION] gs://[BUCKET_NAME] gsutil retention lock gs://[BUCKET_NAME]

For more information, visit <https://cloud.google.com/storage/docs/using-bucket-lock#set-policy>.
