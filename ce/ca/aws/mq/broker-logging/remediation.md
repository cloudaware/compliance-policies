# Remediation

## Enable Audit Logging for the Broker

Enable audit logging on the Amazon MQ for ActiveMQ broker to ensure that all administrative actions are captured and delivered to Amazon CloudWatch Logs.

### From the Command Line

#### Step 1: Enable Audit Logs on the Broker

Run the following command to update the broker configuration and enable audit logging:

```bash
aws mq update-broker \
  --broker-id {{broker-id}} \
  --logs 'Audit=true'
```

## Ensure Required CloudWatch Logs Permissions

Audit logs are delivered to Amazon CloudWatch Logs. To successfully publish logs, the required IAM permissions and resource-based policies must be in place.

### Grant `logs:CreateLogGroup` Permission

Ensure that the IAM principal used to create or manage the broker has permission to create CloudWatch log groups.

Example IAM policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "logs:CreateLogGroup",
      "Resource": "arn:aws:logs:*:*:log-group:/aws/amazonmq/*"
    }
  ]
}
```

**Important:**
If this permission is not granted before the broker is created or rebooted, Amazon MQ will not create the required log group.

## Configure a CloudWatch Logs Resource-Based Policy

Amazon MQ requires a resource-based policy to publish logs to CloudWatch Logs. Without this policy, audit logs cannot be delivered.

### Required Permissions

The policy must allow the following actions:

* `logs:CreateLogStream`
* `logs:PutLogEvents`

### Example Resource-Based Policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "mq.amazonaws.com"
      },
      "Action": [
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:log-group:/aws/amazonmq/*"
    }
  ]
}
```

Apply the policy using the AWS CLI (replace the region as needed):

```bash
aws logs put-resource-policy \
  --region us-east-1 \
  --policy-name AmazonMQ-Logs \
  --policy-document '{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": { "Service": "mq.amazonaws.com" },
        "Action": ["logs:CreateLogStream", "logs:PutLogEvents"],
        "Resource": "arn:aws:logs:*:*:log-group:/aws/amazonmq/*"
      }
    ]
  }'
```

**Note:**
Because this policy applies to the `/aws/amazonmq/` log group prefix, it needs to be configured only once per AWS account per region.
