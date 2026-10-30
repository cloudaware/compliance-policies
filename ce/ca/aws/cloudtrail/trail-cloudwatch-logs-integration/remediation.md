# Remediation

## Configure CloudWatch Logs Integration

To support centralized monitoring and alerting for CloudTrail events, configure the trail to deliver logs to an Amazon CloudWatch Logs log group and specify an IAM role that CloudTrail can assume to publish log data.

### **From Command Line**

If a target log group does not already exist, create one:

```sh
aws logs create-log-group \
  --region {{region}} \
  --log-group-name {{log-group-name}}
```

Create a trust policy document `{{cloudtrail-trust-policy}}.json` with the following content:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudtrail.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

Create the IAM role that CloudTrail will assume to publish log events:

```sh
aws iam create-role \
  --role-name {{cloudtrail-cloudwatch-role}} \
  --assume-role-policy-document file://{{cloudtrail-trust-policy}}.json
```

Create a permissions policy document `{{cloudtrail-cloudwatch-policy}}.json` with the following content:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": [
        "arn:aws:logs:{{region}}:{{account-id}}:log-group:{{log-group-name}}:log-stream:*"
      ]
    }
  ]
}
```

Create a customer-managed IAM policy from that document:

```sh
aws iam create-policy \
  --policy-name {{cloudtrail-cloudwatch-policy-name}} \
  --policy-document file://{{cloudtrail-cloudwatch-policy}}.json
```

Attach the policy to the role:

```sh
aws iam attach-role-policy \
  --role-name {{cloudtrail-cloudwatch-role}} \
  --policy-arn {{cloudtrail-cloudwatch-policy-arn}}
```

Update the trail to send events to CloudWatch Logs by using the log group ARN and the IAM role ARN:

```sh
aws cloudtrail update-trail \
  --region {{region}} \
  --name {{trail-name}} \
  --cloud-watch-logs-log-group-arn {{log-group-name-arn}} \
  --cloud-watch-logs-role-arn {{cloudtrail-cloudwatch-role-arn}}
```

## Notes

- The IAM role trust policy must allow `cloudtrail.amazonaws.com` to assume the role.
- The IAM role must allow CloudTrail to create log streams and put log events in the target CloudWatch Logs log group.
- After enabling integration, consider configuring an appropriate log retention period and CloudWatch alarms for important trail events.
