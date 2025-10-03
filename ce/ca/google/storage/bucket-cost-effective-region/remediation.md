# Remediation

## Migrate Google Cloud Storage Buckets

The migration depends on the size of the data to transfer:

- Option 1: Use `gcloud` (for transfers < 1 TB)
- Option 2: Use Storage Transfer Service (for transfers ≥ 1 TB)

### Determine Transfer Strategy

**New bucket name:**

- Applications must be updated to point to `{{destination-bucket}}`.
- Steps: copy data → update applications → verify → delete original bucket.

**Keep bucket name:**

- Use a temporary bucket `{{temp-bucket}}`.
- Steps: copy data → downtime → delete original bucket → create new bucket with same name → copy data from temporary bucket → delete temporary bucket → verify.

**Note**: Bucket names must be globally unique. When retaining the same name, create the new bucket immediately after deleting the old one.

## From gcloud CLI (< 1 TB)

Use this option when your data is small enough to be handled efficiently via `gcloud` CLI.

### Create the Destination Bucket

```sh
gcloud storage buckets create gs://{{destination-bucket}} \
  --location={{target-region}} \
  --storage-class={{storage-class}}
```

### Copy Data to the New Bucket

```sh
gcloud storage cp --recursive gs://{{source-bucket}}/* gs://{{destination-bucket}}
```

- Include `--include-managed-folders` if your bucket uses managed folders.

### Verify Data

- Compare object counts, sizes, and metadata between source and destination buckets.

### Update Applications

- Update all applications, scripts, and services to use the new bucket name.
- Confirm proper access via Cloud Audit Logs.

### Delete the Original Bucket

```sh
gcloud storage rm --recursive gs://{{source-bucket}}
```

Or, delete the contents from the source bucket without deleting the source bucket itself:

```sh
gcloud storage rm --all-versions gs://{{source-bucket}}/**
```

## Use Storage Transfer Service (≥ 1 TB)

Use this option for large-scale transfers, as it provides managed reliability, performance, and security.

### Grant IAM Permissions

```sh
gcloud storage buckets add-iam-policy-binding gs://{{destination-bucket}} \
  --member=serviceAccount:{{project-id}}@storage-transfer-service.iam.gserviceaccount.com \
  --role=roles/storage.admin
```

### Create a Storage Transfer Job

```sh
gcloud transfer jobs create gs://{{source-bucket}} gs://{{destination-bucket}}
```

### Verify Transfer

- Check that objects, versions, and metadata are copied correctly.
- Review Cloud Logging for transfer success and errors.

### Update Applications

- Point applications and workloads to `{{destination-bucket}}`.
- Verify proper access via Cloud Audit Logs.

### Delete Original Bucket

- Use `deleteObjectsFromSourceAfterTransfer=true` in the transfer job, or manually using `gcloud storage rm`.
