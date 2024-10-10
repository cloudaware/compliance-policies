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

```txt
Data Events:S3 
Log selector template 
Log all events
```

If `basic events selectors` is being used it should read:

```txt
Data events: S3 
Bucket Name: All current and future S3 buckets 
Write: Enabled
```

6. Repeat steps 2-5 to verify that each trail has multi-region enabled and is
configured to log data events. If a trail does not have multi-region enabled and
data event logging configured, refer to the remediation steps.

### From Command Line

1. Run `list-trails` command to list all trails:

```sh
aws cloudtrail list-trails
```

2. The command output will be a list of trails:

```
"TrailARN": "arn:aws:cloudtrail::<account#>:trail/", 
"Name": "", 
"HomeRegion": ""
```

3. Next run `get-trail` command to determine whether a trail is a multi-region trail:

```sh
aws cloudtrail get-trail --name <trailname> --region <region_name>
```

4. The command output should include:

```
"IsMultiRegionTrail": true
```

5. Next run `get-event-selectors` command using the `Name` of the trail and the `region` returned in step 2 to determine if data event logging is configured:

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

7. If the `get-event-selectors` command returns an empty array, data events are
not included in the trail's logging configuration; therefore, object-level API
operations performed on S3 buckets within your AWS account are not being
recorded.
8. Repeat steps 1-7 to verify that each trail has multi-region enabled and is
configured to log data events. If a trail does not have multi-region enabled and
data event logging configured, refer to the remediation steps.

## References

1. <https://docs.aws.amazon.com/AmazonS3/latest/user-guide/enable-cloudtrail-events.html>
