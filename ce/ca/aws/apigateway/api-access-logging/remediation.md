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

### Set Access Logging for Rest API Stage

1. Enable CloudWatch Access Logging

Specify the `{{rest-api-id}}` and the `{{stage-name}}` you want to configure:

```sh
aws apigateway update-stage \
--rest-api-id {{rest-api-id}} \
--stage-name {{stage-name}} \
--patch-operations op=replace,path=/accessLogSettings/destinationArn,value={{log-group-arn}}
```

Replace `{{log-group-arn}}` with the CloudWatch Logs group ARN for the API Gateway.

2. Set Log Format

You can specify the log format for detailed logs by replacing the `{{$context.variables}}` value:

```sh
aws apigateway update-stage \
--rest-api-id {{rest-api-id}} \
--stage-name {{stage-name}} \
--patch-operations op=replace,path=/accessLogSettings/format,value='{{$context.variables}}'
```

### Set Logging Level for HTTP and WebSocket API Stages

For HTTP and WebSocket APIs, use the following command:

```sh
aws apigatewayv2 update-stage \
--api-id {{api-id}} \
--stage-name {{stage-name}} \
--access-log-settings '{"DestinationArn": "{{log-group-arn}}", "Format": "{{$context.variables}}"}'
```
