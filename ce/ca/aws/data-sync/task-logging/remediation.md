# Remediation

## From Command Line

### Prerequisites

If you need to create a new CloudWatch Log Group, use the following command:

```sh
aws logs create-log-group --log-group-name {{log-group-name}}
```

Ensure that DataSync has permission to upload logs to the CloudWatch log group.

### Associate the Log Group with the DataSync Task

```sh
aws datasync update-task \
    --task-arn {{task-arn}} \
    --cloud-watch-log-group-arn {{log-group-arn}}
```

**Note**: For Enhanced mode tasks, you **must** use `/aws/datasync` as your log group name. For example: `arn:aws:logs:us-east-1:111222333444:log-group:/aws/datasync:*`
