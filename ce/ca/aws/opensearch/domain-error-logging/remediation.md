# Remediation

## Enable Error Log Publishing for OpenSearch Domain

To enable publishing of OpenSearch Service error logs (`ES_APPLICATION_LOGS`) to Amazon CloudWatch Logs, perform the following steps.

### Step 1: Create a CloudWatch Log Group

If a log group does not already exist, create one using the AWS CLI:

```sh
aws logs create-log-group \
    --log-group-name {{log-group-name}}
```

### Step 2: Retrieve the Log Group ARN

Obtain the ARN of the log group, which will be required in later steps:

```sh
aws logs describe-log-groups \
    --log-group-name-prefix {{log-group-name}}
    --query logGroups[*].arn
```

### Step 3: Grant OpenSearch Service Permission to Write Logs

Attach a resource-based policy to CloudWatch Logs that allows OpenSearch Service to create log streams and publish log events. Replace `cw_log_group_arn` with your actual log group ARN.

```sh
aws logs put-resource-policy \
    --policy-name {{opensearch-log-publishing-policy}} \
    --policy-document '{
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Principal": {
                    "Service": "es.amazonaws.com"
                },
                "Action": [
                    "logs:CreateLogStream",
                    "logs:PutLogEvents"
                ],
                "Resource": "{{log-group-arn}}:*"
            }
        ]
    }'
```

### Step 4: Enable Error Log Publishing on the OpenSearch Domain

Update the OpenSearch domain configuration to enable error log publishing and associate it with the CloudWatch log group:

```sh
aws opensearch update-domain-config \
    --domain-name my-domain \
    --log-publishing-options \
    ES_APPLICATION_LOGS=CloudWatchLogsLogGroupArn={{log-group-arn}},Enabled=true
```

#### Additional Information

The `--log-publishing-options` parameter can be used with the following supported log types:

- `SEARCH_SLOW_LOGS`
- `INDEX_SLOW_LOGS`
- `ES_APPLICATION_LOGS`
- `AUDIT_LOGS`

Each log type follows the syntax:

```text
KeyName1=CloudWatchLogsLogGroupArn=string,Enabled=boolean,KeyName2=CloudWatchLogsLogGroupArn=string,Enabled=boolean
```
