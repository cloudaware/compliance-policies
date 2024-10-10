# Description

Real-time monitoring of API calls can be achieved by directing CloudTrail Logs to
CloudWatch Logs or an external Security Information and Event Management (SIEM)
environment, and establishing corresponding metric filters and alarms.

It is recommended that a metric filter and alarm be established for changes made to
AWS Organizations in the master AWS account.

## Rationale

CloudWatch is an AWS native service that allows you to observe and monitor resources and applications. CloudTrail Logs can also be sent to an external Security information and event management (SIEM) environment for monitoring and alerting.

Monitoring AWS Organizations changes can help you prevent any unwanted, accidental or intentional modifications that may lead to unauthorized access or other security breaches. This monitoring technique helps you to ensure that any unexpected changes performed within your AWS Organizations can be investigated and any unwanted changes can be rolled back.

## Audit

If you are using CloudTrails and CloudWatch, perform the following:

1. Ensure that there is at least one active multi-region CloudTrail with prescribed metric filters and alarms configured:

- Identify the log group name configured for use with active multi-region CloudTrail.
- List all CloudTrails:

```sh
aws cloudtrail describe-trails
```

- Identify Multi region Cloudtrails, Trails with `IsMultiRegionTrail` set to true.
- From value associated with CloudWatchLogsLogGroupArn note `<cloudtrail_log_group_name>`.

Example: for CloudWatchLogsLogGroupArn that looks like `arn:aws:logs::<aws_account_number>:log-group:NewGroup:*`, `<cloudtrail_log_group_name>` would be `NewGroup`.

- Ensure Identified Multi region CloudTrail is active:

```sh
aws cloudtrail get-trail-status --name <Name of a Multi-region CloudTrail>
```

Ensure `IsLogging` is set to `TRUE`.

- Ensure identified Multi-region Cloudtrail captures all Management Events:

```sh
aws cloudtrail get-event-selectors --trail-name <trailname shown in describe-trails>
```

- Ensure there is at least one Event Selector for a Trail with `IncludeManagementEvents` set to `true` and `ReadWriteType` set to `All`.

2. Get a list of all associated metric filters for this `<cloudtrail_log_group_name>`:

```sh
aws logs describe-metric-filters --log-group-name <cloudtrail_log_group_name>
```

3. Ensure the output from the above command contains the following:

```json
"filterPattern": "{ ($.eventSource = organizations.amazonaws.com) && (($.eventName = \"AcceptHandshake\") || ($.eventName = \"AttachPolicy\") || ($.eventName = \"CreateAccount\") || ($.eventName = \"CreateOrganizationalUnit\") || ($.eventName = \"CreatePolicy\") || ($.eventName = \"DeclineHandshake\") || ($.eventName = \"DeleteOrganization\") || ($.eventName = \"DeleteOrganizationalUnit\") || ($.eventName = \"DeletePolicy\") || ($.eventName = \"DetachPolicy\") || ($.eventName = \"DisablePolicyType\") || ($.eventName = \"EnablePolicyType\") || ($.eventName = \"InviteAccountToOrganization\") || ($.eventName = \"LeaveOrganization\") || ($.eventName = \"MoveAccount\") || ($.eventName = \"RemoveAccountFromOrganization\") || ($.eventName = \"UpdatePolicy\") || ($.eventName = \"UpdateOrganizationalUnit\")) }"
```

4. Note the `<organizations_changes>` value associated with the filterPattern found in step 3.
5. Get a list of CloudWatch alarms and filter on the `<organizations_changes>` captured in step 4:

```sh
aws cloudwatch describe-alarms --query 'MetricAlarms[?MetricName== `<organizations_changes>`]'
```

6. Note the `AlarmActions` value - this will provide the SNS topic ARN value.
7. Ensure there is at least one active subscriber to the SNS topic:

```sh
aws sns list-subscriptions-by-topic --topic-arn <sns_topic_arn>
```

At least one subscription should have `SubscriptionArn` with valid aws ARN. Example of valid `SubscriptionArn`: `arn:aws:sns:<region>:<aws_account_number>:<SnsTopicName>:<SubscriptionID>`.

## References

1. <https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudwatch-alarms-for-cloudtrail.html>
2. <https://docs.aws.amazon.com/organizations/latest/userguide/orgs_security_incident-response.html>

## Additional Information

Configuring a log metric filter and alarm on a multi-region (global) CloudTrail trail:

- ensures that activities from all regions (both used and unused) are monitored
- ensures that activities on all supported global services are monitored
- ensures that all management events across all regions are monitored
