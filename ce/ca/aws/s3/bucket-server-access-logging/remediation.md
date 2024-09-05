# Remediation

## Prerequisites

- The destination (target) bucket must be in the same AWS Region and AWS account as the source bucket.
- Your destination bucket should not have server access logging enabled.
- S3 buckets that have S3 Object Lock enabled can't be used as destination buckets
- The destination bucket must not have Requester Pays enabled.
- Default server-side encryption with AWS Key Management Service (AWS KMS) keys (SSE-KMS) is not supported.

## From Command Line

It's recommended that you create a dedicated logging bucket in each AWS Region that you have S3 buckets in. Then have your Amazon S3 access logs delivered to that S3 bucket. Distinguish buckets from each other by adding a prefix.

### Step 1. Grant permissions for server access log delivery by using a bucket policy

To grant permissions to the logging service principal, use the `put-bucket-policy` command. Replace `{{your-log-destination-bucket}}` with the name of your destination bucket.

```bash
aws s3api put-bucket-policy --bucket {{your-log-destination-bucket}} --policy file://{{policy.json}}
```

`{{policy.json}}` is a JSON document that contains the following bucket policy. `{{your-log-destination-bucket}}` is the destination bucket where server access logs will be delivered, and `{{your-source-bucket}}` is the source bucket. `{{your-account-id}}` is the AWS account that owns the source bucket.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "S3ServerAccessLogsPolicy",
            "Effect": "Allow",
            "Principal": {
                "Service": "logging.s3.amazonaws.com"
            },
            "Action": [
                "s3:PutObject"
            ],
            "Resource": "arn:aws:s3:::{{your-log-destination-bucket}}/*",
            "Condition": {
                "ArnLike": {
                    "aws:SourceArn": "arn:aws:s3:::{{your-source-bucket}}"
                },
                "StringEquals": {
                    "aws:SourceAccount": "{{your-account-id}}"
                }
            }
        }
    ]
} 
```

### Step 2. Use `put-bucket-logging` command to apply the logging configuration

Create a `{{logging.json}}` file that contains your logging configuration:

```json
{
    "LoggingEnabled": {
        "TargetBucket": "{{your-log-destination-bucket}}",
        "TargetPrefix": "{{your-prefix}}"
    }
} 
```

Replace `{{your-log-destination-bucket}}` with the name of the bucket where you want to store the access logs, and `{{your-prefix}}` with an optional prefix to define a folder structure within the logging bucket.

After you create the `{{logging.json}}` file, you can apply the logging configuration by using the  `put-bucket-logging` command. Replace `{{your-log-destination-bucket}}` with the name of your destination bucket.

```bash
aws s3api put-bucket-logging --bucket {{your-log-destination-bucket}} --bucket-logging-status file://{{logging.json}}
```
