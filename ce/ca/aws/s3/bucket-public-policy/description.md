# Description

This policy identifies AWS S3 Buckets whose bucket policies grant public read or write access.

A bucket policy is considered public if it contains a statement with `"Effect": "Allow"` and a `"Principal"` set to `"*"` or `{"AWS": "*"}`. The evaluation focuses on permissions that allow reading (`s3:GetObject`, `s3:GetObjectVersion`, `s3:ListBucket`), writing (`s3:PutObject`, `s3:DeleteObject`, `s3:DeleteObjectVersion`, `s3:PutObjectAcl`, `s3:PutBucketAcl`, `s3:PutBucketPolicy`), or any broader permissions that implicitly include these actions (e.g., `"*"`, `s3:*`, or `s3:Delete*`).

## Rationale

Publicly accessible bucket policies pose significant security risks. Granting `s3:GetObject` to a public principal allows anyone on the internet to read objects stored in the bucket, potentially resulting in data exposure. Similarly, granting write-related permissions, such as `s3:PutObject` or `s3:DeleteObject`, allows unauthorized users to upload, modify, or delete objects, jeopardizing data integrity and availability.

## Audit

This policy flags an *AWS S3 Bucket* as `INCOMPLIANT` when:

- `Block Public Policy` is not set to **Yes**, and
- The `Policy Document` grants any of the following permissions to a public principal:

### Read Permissions

- `s3:GetObject`
- `s3:GetObjectVersion`
- `s3:ListBucket`

### Write Permissions

- `s3:PutObject`
- `s3:DeleteObject`
- `s3:DeleteObjectVersion`
- `s3:PutObjectAcl`
- `s3:PutBucketAcl`
- `s3:PutBucketPolicy`
