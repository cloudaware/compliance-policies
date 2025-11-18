# Remediation

## Enable Server-Side Encryption with AWS KMS Keys

### **From Command Line**

To enable server-side encryption with AWS Key Management Service (SSE-KMS or DSSE-KMS) on an AWS S3 bucket, run the following command:

```sh
aws s3api put-bucket-encryption \
    --bucket {{bucket-name}} \
    --server-side-encryption-configuration '{
        "Rules": [
            {
                "ApplyServerSideEncryptionByDefault": {
                    "SSEAlgorithm": "{{aws:kms | aws:kms:dsse}}",
                    "KMSMasterKeyID": "{{kms-key-arn}}"
                },
                "BucketKeyEnabled": true
            }
        ]
    }'
```

This command enables KMS-based encryption for all new objects uploaded to the specified bucket.

Existing objects remain unencrypted. You can encrypt an unencrypted object to use SSE-KMS by copying the object back in place:

```sh
aws s3api copy-object 
    --bucket {{bucket-name}} \
    --key {{object-key}} \
    --body {{filepath}} \
    --bucket {{bucket-name}} \
    --key {{object-key}} \
    --body {{filepath}} \
    --sse {{aws:kms | aws:kms:dsse}} \
    --sse-kms-key-id {{kms-key-id}} 
    
```

## Require Server-Side Encryption

To ensure that all new objects uploaded to a bucket are encrypted with SSE-KMS, attach a bucket policy that denies any upload request (`s3:PutObject`) lacking the required KMS encryption headers.

The following example bucket policy denies uploads that do not specify server-side encryption with **SSE-KMS**:

```json
{
   "Version": "2012-10-17",
   "Id": "PutObjectPolicy",
   "Statement": [
      {
         "Sid": "DenyUnencryptedObjectUploads",
         "Effect": "Deny",
         "Principal": "*",
         "Action": "s3:PutObject",
         "Resource": "arn:aws:s3:::{{s3-bucket-name}}/*",
         "Condition": {
            "Null": {
               "s3:x-amz-server-side-encryption-aws-kms-key-id": "true"
            }
         }
      }
   ]
}
```

To require the use of a **specific AWS KMS key**, add the following condition to the policy:

```json
"StringNotEquals": {
   "s3:x-amz-server-side-encryption-aws-kms-key-id": "arn:aws:kms:{{region}}:{{account-id}}:key/{{key-id}}"
}
```

## Require Dual-Layer Server-Side Encryption with AWS KMS Keys (DSSE-KMS)

To enforce dual-layer encryption (DSSE-KMS) for all new object uploads, use the following bucket policy. This policy denies any `s3:PutObject` request that does not specify **DSSE-KMS** encryption.

```json
{
   "Version": "2012-10-17",
   "Id": "PutObjectPolicy",
   "Statement": [
      {
         "Sid": "DenyUnencryptedObjectUploads",
         "Effect": "Deny",
         "Principal": "*",
         "Action": "s3:PutObject",
         "Resource": "arn:aws:s3:::{{s3-bucket-name}}/*",
         "Condition": {
            "StringNotEquals": {
               "s3:x-amz-server-side-encryption": "aws:kms:dsse"
            }
         }
      }
   ]
}
```
