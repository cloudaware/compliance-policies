# Remediation

Perform the following to enable S3 bucket logging:

## From Console

1. Sign in to the AWS Management Console and open the S3 console at <https://console.aws.amazon.com/s3>.
2. Under `All Buckets` click on the target S3 bucket.
3. Click on `Properties` in the top right of the console.
4. Under `Bucket: <s3_bucket_for_cloudtrail>` click on `Logging`.
5. Configure bucket logging:
    - Click on the `Enabled` checkbox.
    - Select Target Bucket from list.
    - Enter a Target Prefix.
6. Click `Save`.

## From Command Line

1. Get the name of the S3 bucket that CloudTrail is logging to:

```sh
aws cloudtrail describe-trails --region <region-name> --query trailList[*].S3BucketName
```

2. Copy and add target bucket name at `<Logging_BucketName>`, Prefix for logfile at `<LogFilePrefix>` and optionally add an email address in the following template and save it as `<FileName.Json>`:

```json
{ 
    "LoggingEnabled": { 
        "TargetBucket": "<Logging_BucketName>", 
        "TargetPrefix": "<LogFilePrefix>", 
        "TargetGrants": [ 
            { 
                "Grantee": { 
                    "Type": "AmazonCustomerByEmail", 
                    "EmailAddress": "<EmailID>" 
                }, 
                "Permission": "FULL_CONTROL" 
            } 
        ] 
    } 
}
```

3. Run the `put-bucket-logging` command with bucket name and `<FileName.Json>` as input:

```sh
aws s3api put-bucket-logging --bucket <BucketName> --bucket-logging-status file://<FileName.Json>
```
