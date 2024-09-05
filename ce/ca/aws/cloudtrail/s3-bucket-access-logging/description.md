# Description

S3 Bucket Access Logging generates a log that contains access records for each request made to your S3 bucket. An access log record contains details about the request, such as the request type, the resources specified in the request worked, and the time and date the request was processed. It is recommended that bucket access logging be enabled on the CloudTrail S3 bucket.

## Rationale

By enabling S3 bucket logging on target S3 buckets, it is possible to capture all events which may affect objects within any target buckets. Configuring logs to be placed in a separate bucket allows access to log information which can be useful in security and incident response workflows.

## Audit

Perform the following ensure the CloudTrail S3 bucket has access logging is enabled:

### From Console

1. Go to the Amazon CloudTrail console at <https://console.aws.amazon.com/cloudtrail/home>.
2. In the API activity history pane on the left, click `Trails`.
3. In the Trails pane, note the bucket names in the `S3 bucket` column.
4. Sign in to the AWS Management Console and open the S3 console at <https://console.aws.amazon.com/s3>.
5. Under `All Buckets` click on a `target S3 bucket`.
6. Click on `Properties` in the top right of the console.
7. Under `Bucket: _ <bucket_name> _` click on `Logging`.
8. Ensure `Enabled` is checked.

### From Command Line

1. Get the name of the S3 bucket that CloudTrail is logging to:

```sh
aws cloudtrail describe-trails --query 'trailList[*].S3BucketName'
```

2. Ensure Bucket Logging is enabled:

```sh
aws s3api get-bucket-logging --bucket <s3_bucket_for_cloudtrail>
```

Ensure command does not return empty output.

Sample Output for a bucket with logging enabled:

```json
{ 
    "LoggingEnabled": { 
        "TargetPrefix": "<Prefix_Test>", 
        "TargetBucket": "<Bucket_name_for_Storing_Logs>" 
    } 
}
```

## Default Value

Logging is disabled.

## References

1. CCE-78918-0
2. <https://docs.aws.amazon.com/AmazonS3/latest/dev/ServerLogs.html>
