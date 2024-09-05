# Remediation

## From Command Line

- Use the following AWS CLI command to enable versioning for your S3 bucket. Replace `{{your-bucket-name}}` with the actual name of your S3 bucket.

    ```bash
    aws s3api put-bucket-versioning --bucket {{your-bucket-name}} --versioning-configuration Status=Enabled
    ```

   This command sends a request to Amazon S3 to enable versioning for the specified bucket.

- To confirm that versioning has been successfully enabled for your bucket, you can use the following command:

    ```bash
    aws s3api get-bucket-versioning --bucket {{your-bucket-name}}
    ```

   The response will include the versioning configuration for your bucket, and you should see `"Status": "Enabled"`.
