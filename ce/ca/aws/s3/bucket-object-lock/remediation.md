# Enable S3 Object Lock via AWS CLI

Before you lock any objects, you must enable S3 Versioning and Object Lock on a bucket. Afterward, you can set a retention period, a legal hold, or both.

## Important Notes
- After you enable Object Lock on a bucket, you can't disable Object Lock or suspend versioning for that bucket.
- S3 buckets with Object Lock can't be used as destination buckets for server access logs.

## Topics

1. [Enable Object Lock when creating a new S3 bucket](#enable-object-lock-when-creating-a-new-s3-bucket)
2. [Enable Object Lock on an existing S3 bucket](#enable-object-lock-on-an-existing-s3-bucket)
3. [Set or modify a legal hold on an S3 object](#set-or-modify-a-legal-hold-on-an-s3-object)
4. [Set or modify a retention period on an S3 object](#set-or-modify-a-retention-period-on-an-s3-object)


## Enable Object Lock when creating a new S3 bucket

### From Command Line

```bash
aws s3api create-bucket --bucket {{your-bucket-name}} --object-lock-enabled-for-bucket
```

Replace `{{your-bucket-name}}` with a desired bucket name. The command activates versioning automatically.

## Enable Object Lock on an existing S3 bucket

### From Command Line

1. Use the following AWS CLI command to enable versioning for your S3 bucket first. Replace `{{your-bucket-name}}` with the actual name of your S3 bucket.

    ```bash
    aws s3api put-bucket-versioning --bucket {{your-bucket-name}} --versioning-configuration Status=Enabled
    ```

2. Use `put-object-lock-configuration` to set Object Lock on the existing bucket. The following example also sets a default retention to 50-day for the specified `{{your-bucket-name}}` bucket.

    ```bash
    aws s3api put-object-lock-configuration --bucket {{your-bucket-name}} --object-lock-configuration='{ "ObjectLockEnabled": "Enabled", "Rule": { "DefaultRetention": { "Mode": "COMPLIANCE", "Days": 50 }}}'
    ```
-  To remove the default retention configuration on a bucket use the following `put-object-lock-configuration` example:

    ```bash
    aws s3api put-object-lock-configuration --bucket DOC-EXAMPLE-BUCKET1 --object-lock-configuration='{ "ObjectLockEnabled": "Enabled"}'
    ```
## Set or modify a legal hold on an S3 object

- To set a legal hold on the object `{{your-image.png}}` in the bucket named `{{your-bucket-name}}` use the following example: 

    ```bash
    aws s3api put-object-legal-hold --bucket {{your-bucket-name}} --key {{your-image.png}} --legal-hold="Status=ON"
    ```
- To remove a legal hold on the object `{{your-image.png}}` in the bucket named `{{your-bucket-name}}` use the following example: 

    ```bash
    aws s3api put-object-legal-hold --bucket {{your-bucket-name}} --key {{your-image.png}} --legal-hold="Status=OFF"
    ```

## Set or modify a retention period on an S3 object

- To set a retention period on the object `{{your-image.png}}` in the bucket named `{{your-bucket-name}}` use the following example: 

    ```bash
    aws s3api put-object-retention --bucket {{your-bucket-name}} --key {{your-image.png}} --retention='{ "Mode": "GOVERNANCE", "RetainUntilDate": "2025-01-01T00:00:00" }'
    ```