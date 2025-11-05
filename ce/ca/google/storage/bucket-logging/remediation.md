# Remediation

## Using gcloud CLI

1. **Grant Cloud Storage permission to write logs to the logging bucket:**

   ```sh
   gcloud storage buckets add-iam-policy-binding gs://{{logging-bucket-name}} \
       --member="group:cloud-storage-analytics@google.com" \
       --role="roles/storage.objectCreator"
   ```

   This grants Cloud Storage (represented by the service group `cloud-storage-analytics@google.com`) permission to create and store log objects in the designated logging bucket.

2. **Enable access logging on the target bucket:**

   ```sh
   gcloud storage buckets update gs://{{source-bucket-name}} \
       --log-bucket=gs://{{logging-bucket-name}} \
       [--log-object-prefix={{log-object-prefix}}]
   ```

   Use the optional `--log-object-prefix` flag to define a prefix for log object names.
   The prefix can be up to 900 characters long and must follow valid object naming conventions.
   If not specified, the source bucket’s name is used as the default prefix.
