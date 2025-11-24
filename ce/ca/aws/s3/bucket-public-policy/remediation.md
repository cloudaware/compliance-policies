# Remediation

## Disable Public Access for S3 Bucket Policies

### Enable S3 Block Public Access

Enabling **Block Public Access** provides a centralized and comprehensive safeguard against unintended public exposure of S3 bucket data. These settings take precedence over any existing ACLs or bucket policies that may otherwise permit public access.

#### **From Command Line**

Use the following command to enable **Block Public Access** on the bucket:

```sh
aws s3api put-public-access-block \
    --bucket {{bucket-name}} \
    --public-access-block-configuration "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"
```

### Update the Bucket Policy

To further restrict public access, review and update the bucket policy to replace broad public access (`"Principal": "*"`) with specific principals as needed.

1. Retrieve the current bucket policy and save it locally:

    ```sh
    aws s3api get-bucket-policy \
        --bucket {{bucket-name}} \
        --query Policy \
        --output text > policy.json
    ```

2. Modify the `policy.json` file to remove or adjust any statements that allow public access.

3. Apply the updated policy back to the bucket:

    ```sh
    aws s3api put-bucket-policy \
        --bucket {{bucket-name}} \
        --policy file://policy.json
    ```
