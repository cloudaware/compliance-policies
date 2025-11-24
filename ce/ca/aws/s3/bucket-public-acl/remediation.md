# Remediation

## Disable Public Access for S3 Bucket ACL

### Enable S3 Block Public Access

Enabling **Block Public Access** provides a centralized and comprehensive mechanism to prevent public access to your S3 buckets. These settings override any existing ACLs or bucket policies that might otherwise allow public access.

#### **From Command Line**

To enable Block Public Access on the bucket, run the following command:

```sh
aws s3api put-public-access-block \
    --bucket {{bucket-name}} \
    --public-access-block-configuration "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"
```

### Apply the `private` Canned ACL

Applying the **`private`** canned ACL removes all public access grants and ensures that only the bucket owner has full control.

```sh
aws s3api put-bucket-acl \
    --bucket {{bucket-name}} \
    --acl private
```
