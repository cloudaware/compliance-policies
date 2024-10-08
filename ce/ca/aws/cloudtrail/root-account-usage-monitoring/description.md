# Description

Real-time monitoring of API calls can be achieved by directing CloudTrail Logs to CloudWatch Logs, or an external Security information and event management (SIEM) environment, and establishing corresponding metric filters and alarms.

It is recommended that a metric filter and alarm be established for root login attempts to detect the unauthorized use, or attempts to use the root account.

## Rationale

CloudWatch is an AWS native service that allows you to observe and monitor resources
and applications. CloudTrail logs can also be sent to an external Security Information
and Event Management (SIEM) environment for monitoring and alerting.

Monitoring root account logins will provide visibility into the use of a fully privileged
account and the opportunity to reduce its usage.

# Audit

If you are using CloudTrails and CloudWatch, perform the following to ensure that there is at least one active multi-region CloudTrail with prescribed metric filters and alarms configured:

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

•
Ensure identified Multi-region Cloudtrail captures all Management Events:

```sh
aws cloudtrail get-event-selectors --trail-name <trailname shown in describe-trails>
```

Ensure there is at least one Event Selector for a Trail with `IncludeManagementEvents` set to `true` and `ReadWriteType` set to `All`.

2. Get a list of all associated metric filters for this `<cloudtrail_log_group_name>`:

```sh
aws logs describe-metric-filters --log-group-name "<cloudtrail_log_group_name>"
```

3. Ensure the output from the above command contains the following:

```json
"filterPattern": "{ $.userIdentity.type = \"Root\" && $.userIdentity.invokedBy NOT EXISTS && $.eventType != \"AwsServiceEvent\" }"
```

4. Note the `<root_usage_metric>` value associated with the `filterPattern` found in step 3.
5. Get a list of CloudWatch alarms and filter on the `<root_usage_metric>` captured in step 4:

```sh
aws cloudwatch describe-alarms --query 'MetricAlarms[?MetricName== `<root_usage_metric>`]'
```

6. Note the `AlarmActions` value - this will provide the SNS topic ARN value.
7. Ensure there is at least one active subscriber to the SNS topic:

```sh
aws sns list-subscriptions-by-topic --topic-arn <sns_topic_arn>
```

At least one subscription should have `SubscriptionArn` with valid aws ARN.

Example of valid `SubscriptionArn`: `arn:aws:sns:<region>:<aws_account_number>:<SnsTopicName>:<SubscriptionID>`.

## References

1. CCE-79188-9
2. <https://docs.aws.amazon.com/awscloudtrail/latest/userguide/receive-cloudtrail-log-files-from-multiple-regions.html>
3. <https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudwatch-alarms-for-cloudtrail.html>
4. <https://docs.aws.amazon.com/sns/latest/dg/SubscribeTopic.html>

## Additional Information

Configuring log metric filter and alarm on Multi-region (global) CloudTrail:

- Ensures that activities from all regions (used as well as unused) are monitored.
- Ensures that activities on all supported global services are monitored.
- Ensures that all management events across all regions are monitored.
