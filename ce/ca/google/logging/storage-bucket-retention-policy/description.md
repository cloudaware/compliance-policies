# Description

Enabling retention policies on log buckets will protect logs stored in cloud storage buckets from being overwritten or accidentally deleted. It is recommended to set up retention policies and configure Bucket Lock on all storage buckets that are used as log sinks.

## Rationale

Logs can be exported by creating one or more sinks that include a log filter and a destination. As Cloud Logging receives new log entries, they are compared against each sink. If a log entry matches a sink's filter, then a copy of the log entry is written to the destination.

Sinks can be configured to export logs in storage buckets. It is recommended to configure a data retention policy for these cloud storage buckets and to lock the data retention policy; thus permanently preventing the policy from being reduced or removed. This way, if the system is ever compromised by an attacker or a malicious insider who wants to cover their tracks, the activity logs are definitely preserved for forensics and security investigations.

## Impact

Locking a bucket is an irreversible action. Once you lock a bucket, you cannot remove the retention policy from the bucket or decrease the retention period for the policy. You will then have to wait for the retention period for all items within the bucket before you can delete them, and then the bucket.

## Audit

### From Google Cloud Console

1. Open the Cloud Storage browser in the Google Cloud Console by visiting <https://console.cloud.google.com/storage/browser>.
2. In the Column display options menu, make sure `Retention policy` is checked.
3. In the list of buckets, the retention period of each bucket is found in the `Retention policy` column. If the retention policy is locked, an image of a lock appears directly to the left of the retention period.

### From Google Cloud CLI

1. To list all sinks destined to storage buckets:

        gcloud logging sinks list --folder=FOLDER_ID | --organization=ORGANIZATION_ID | --project=PROJECT_ID

2. For every storage bucket listed above, verify that retention policies and Bucket Lock are enabled:

        gsutil retention get gs://BUCKET_NAME

For more information, see <https://cloud.google.com/storage/docs/using-bucket-lock#view-policy>.

## Default Value

By default, storage buckets used as log sinks do not have retention policies and Bucket Lock configured.

## References

1. <https://cloud.google.com/storage/docs/bucket-lock>
2. <https://cloud.google.com/storage/docs/using-bucket-lock>
3. <https://cloud.google.com/storage/docs/bucket-lock>

## Additional Information

Caution: Locking a retention policy is an irreversible action. Once locked, you must delete the entire bucket in order to "remove" the bucket's retention policy. However, before you can delete the bucket, you must be able to delete all the objects in the bucket, which itself is only possible if all the objects have reached the retention period set by the retention policy.
