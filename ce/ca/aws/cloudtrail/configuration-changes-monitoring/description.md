# Description

Real-time monitoring of API calls can be achieved by directing CloudTrail Logs to CloudWatch Logs, or an external Security information and event management (SIEM) environment, where metric filters and alarms can be established.

It is recommended that a metric filter and alarm be utilized for detecting changes to CloudTrail's configurations.

## Rationale

CloudWatch is an AWS native service that allows you to observe and monitor resources
and applications. CloudTrail logs can also be sent to an external Security Information
and Event Management (SIEM) environment for monitoring and alerting.

Monitoring changes to CloudTrail's configuration will help ensure sustained visibility into
the activities performed in the AWS account.

## Impact

Ensuring that changes to CloudTrail configurations are monitored enhances security by
maintaining the integrity of logging mechanisms. Automated monitoring can provide
real-time alerts; however, it may require additional setup and resources to configure and
manage these alerts effectively. These steps can be performed manually within a
company's existing SIEM platform in cases where CloudTrail logs are monitored outside
of the AWS monitoring tools in CloudWatch.

## Audit

If you are using CloudTrails and CloudWatch, perform the following to ensure that there is at least one active multi-region CloudTrail with prescribed metric filters and alarms configured, or that the filters are configured in the appropriate SIEM alerts:

1. Identify the log group name configured for use with active multi-region CloudTrail:

- List all CloudTrails:

```sh
aws cloudtrail describe-trails
```

- Identify Multi region Cloudtrails: Trails with `IsMultiRegionTrail` set to `true`.
- From value associated with CloudWatchLogsLogGroupArn note `<cloudtrail_log_group_name>`.

Example: for CloudWatchLogsLogGroupArn that looks like `arn:aws:logs:<region>:<aws_account_number>:log-group:NewGroup:*`, `<cloudtrail_log_group_name>` would be `NewGroup`.

- Ensure Identified Multi region CloudTrail is active:

```sh
aws cloudtrail get-trail-status --name <Name of a Multi-region CloudTrail>
```

Ensure `IsLogging` is set to `TRUE`.

- Ensure identified Multi-region Cloudtrail captures all Management Events:

```sh
aws cloudtrail get-event-selectors --trail-name <trailname shown in describe-trails>
```

Ensure there is at least one Event Selector for a Trail with `IncludeManagementEvents` set to `true` and `ReadWriteType` set to `All`.

2. Get a list of all associated metric filters for this `<cloudtrail_log_group_name>`:

```sh
aws logs describe-metric-filters --log-group-name <cloudtrail_log_group_name>
```

3. Ensure the filterPattern output from the above command contains the following:

```json
"filterPattern": "{ ($.eventName = CreateTrail) || ($.eventName = UpdateTrail) || ($.eventName = DeleteTrail) || ($.eventName = StartLogging) || ($.eventName = StopLogging) }"
```

4. Note the `<cloudtrail_cfg_changes_metric>` value associated with the filterPattern found in step 3.
5. Get a list of CloudWatch alarms and filter on the `<cloudtrail_cfg_changes_metric>` captured in step 4:

```sh
aws cloudwatch describe-alarms --query 'MetricAlarms[?MetricName== `<cloudtrail_cfg_changes_metric>`]'
```

6. Note the `AlarmActions` value - this will provide the SNS topic ARN value.
7. Ensure there is at least one active subscriber to the SNS topic:

```sh
aws sns list-subscriptions-by-topic --topic-arn <sns_topic_arn>
```

At least one subscription should have `SubscriptionArn` with valid aws ARN.

Example of valid `SubscriptionArn`: `arn:aws:sns:<region>:<aws_account_number>:<SnsTopicName>:<SubscriptionID>`.

## References

1. CCE-79190-5
2. <https://docs.aws.amazon.com/awscloudtrail/latest/userguide/receive-cloudtrail-log-files-from-multiple-regions.html>
3. <https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudwatch-alarms-for-cloudtrail.html>
4. <https://docs.aws.amazon.com/sns/latest/dg/SubscribeTopic.html>

## Additional Information

Configuring log metric filter and alarm on Multi-region (global) CloudTrail:

- Ensures that activities from all regions (used as well as unused) are monitored.
- Ensures that activities on all supported global services are monitored.
- Ensures that all management events across all regions are monitored.
