# Description

S3 object-level API operations such as GetObject, DeleteObject, and PutObject are called data events. By default, CloudTrail trails don't log data events and so it is recommended to enable Object-level logging for S3 buckets.

## Rationale

Enabling object-level logging will help you meet data compliance requirements within your organization, perform comprehensive security analysis, monitor specific patterns of user behavior in your AWS account or take immediate actions on any object-level API activity within your S3 Buckets using Amazon CloudWatch Events.

## Impact

Enabling logging for these object level events may significantly increase the number of events logged and may incur additional cost.

## Audit

### From Console

1. Login to the AWS Management Console and navigate to CloudTrail dashboard at <https://console.aws.amazon.com/cloudtrail/>
2. In the left panel, click `Trails` and then click on the CloudTrail Name that you want to examine.
3. Review `General details`.
4. Confirm that `Multi-region trail` is set to `Yes`.
5. Scroll down to `Data events` and confirm the configuration:

- If `advanced event selectors` is being used, it should read:

```
Data Events:S3 
Log selector template 
Log all events
```

If `basic events selectors` is being used it should read:

```
Data events: S3 
Bucket Name: All current and future S3 buckets 
Read: Enabled
```

6. Repeat steps 2 to 5 to verify that Multi-region trail and Data events logging of S3 buckets in CloudTrail.

### From Command Line

1. Run the `describe-trails` command to list all trail names:

```sh
aws cloudtrail describe-trails --region <region-name> --output table --query
trailList[*].Name
```

2. The command output will be table of the trail names.
3. Run `get-event-selectors` command using the name of the trail returned at the previous step and custom query filters to determine if Data events logging feature is enabled within the selected CloudTrail trail configuration for s3 bucket resources:

```sh
aws cloudtrail get-event-selectors --region <region-name> --trail-name <trail-name> --query EventSelectors[*].DataResources[]
```

4. The command output should be an array that includes the S3 bucket defined for data event logging.
5. If the `get-event-selectors` command returns an empty array, the Data events are not included into the selected AWS Cloudtrail trail logging configuration, therefore the S3 object-level API operations performed within your AWS account are not recorded.
6. Repeat steps 1 to 5 for auditing each s3 bucket to identify other trails that are missing the capability to log Data events.
7. Change the AWS region by updating the `--region` command parameter and perform the audit process for other regions.

## References

1. <https://docs.aws.amazon.com/AmazonS3/latest/user-guide/enable-cloudtrail-events.html>
