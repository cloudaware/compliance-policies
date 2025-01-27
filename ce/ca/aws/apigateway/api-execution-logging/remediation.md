# Remediation

## Prerequisites

To enable CloudWatch Logs, grant API Gateway permission to read and write logs to CloudWatch in your account. The managed policy `AmazonAPIGatewayPushToCloudWatchLogs` (ARN: `arn:aws:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs`) provides the necessary permissions:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:DescribeLogGroups",
                "logs:DescribeLogStreams",
                "logs:PutLogEvents",
                "logs:GetLogEvents",
                "logs:FilterLogEvents"
            ],
            "Resource": "*"
        }
    ]
}
```

To set up these permissions:

1. Create an IAM role with `apigateway.amazonaws.com` as the trusted entity.
2. Attach the above policy to the IAM role.
3. Set the IAM role ARN in the `cloudWatchRoleArn` property of your `Account`. Note that you must configure the `cloudWatchRoleArn` separately for each AWS Region where you wish to enable CloudWatch Logs.

If you receive an error when setting the IAM role ARN, check your AWS Security Token Service account settings to make sure that AWS STS is enabled in the Region that you're using.

## From Command Line

### Set Logging Level for Rest API Stage

1. To override stage settings for a specific resource and method:

```sh
aws apigateway update-stage \
--rest-api-id {{api-id}} \
--stage-name {{stage-name}} \
--patch-operations op=replace,path=/{{resourcePath}}/{{httpMethod}}/logging/loglevel,value=INFO
```

2. To apply logging level to all resources and methods in a stage:

```sh
aws apigateway update-stage \
--rest-api-id {{api-id}} \
--stage-name {{stage-name}} \
--patch-operations op=replace,path=/*/*/logging/loglevel,value=INFO
```

Replace `{{api-id}}`, `{{stage-name}}`, `{{resourcePath}}`, and `{{httpMethod}}` with the appropriate values.

### Set Logging Level for WebSocket API Stage

For WebSocket APIs, use the following command:

```sh
aws apigatewayv2 update-stage \
--api-id {{api-id}} \
--stage-name {{stage-name}} \
--route-settings '{"{{routeKey}}": {"LoggingLevel": "INFO"}}'
```

Replace `{{routeKey}}` with the appropriate Route Key value.
