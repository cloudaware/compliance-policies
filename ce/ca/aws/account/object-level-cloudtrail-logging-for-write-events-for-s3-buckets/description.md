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
5. Scroll down to `Data events`.
6. Confirm that it reads:

```
Data Events:S3 
Log selector template 
Log all events
```

If `basic events selectors` is being used it should read:

```
Data events: S3 
Bucket Name: All current and future S3 buckets 
Write: Enabled
```

7. Repeat steps 2 to 6 to verify that Multi-region trail and Data events logging of S3 buckets in CloudTrail.

### From Command Line

1. Run `list-trails` command to list the names of all Amazon CloudTrail trails currently available in all AWS regions:

```sh
aws cloudtrail list-trails
```

2. The command output will be a list of all the trail names to include:

```
"TrailARN": "arn:aws:cloudtrail::<account#>:trail/", 
"Name": "", 
"HomeRegion": ""
```

3. Next run `get-trail` command to determine Multi-region:

```sh
aws cloudtrail get-trail --name <trailname> --region <region_name>
```

4. The command output should include:

```
"IsMultiRegionTrail": true
```

5. Next run `get-event-selectors` command using the `Name` of the trail and the `region` returned in step 2 to determine if Data events logging feature is enabled within the selected CloudTrail trail for all S3 buckets:

```sh
aws cloudtrail get-event-selectors --region <HomeRegion> --trail-name <trailname> --query EventSelectors[*].DataResources[]
```

6. The command output should be an array that contains the configuration of the AWS resource(S3 bucket) defined for the Data events selector:

```
"Type": "AWS::S3::Object", 
"Values": [ 
    "arn:aws:s3"
]
```

7. If the `get-event-selectors` command returns an empty array `[]`, the Data events are not included in the selected AWS Cloudtrail trail logging configuration, therefore the S3 object-level API operations performed within your AWS account are not recorded.
8. Repeat steps 1 to 5 for auditing each CloudTrail to determine if Data events for S3 are covered.

## References

1. <https://docs.aws.amazon.com/AmazonS3/latest/user-guide/enable-cloudtrail-events.html>
