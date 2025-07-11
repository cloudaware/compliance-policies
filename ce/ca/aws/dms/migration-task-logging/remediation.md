# Remediation

## From Command Line

To enable CloudWatch logging for all key components on an existing AWS DMS Replication Task, use the AWS CLI’s `modify-replication-task` command with an updated `Settings` JSON payload.

### Retrieve the current task settings

```sh
aws dms describe-replication-tasks \
  --filters Name=replication-task-arn,Values={{replication-task-arn}} \
  --query "ReplicationTasks[0].ReplicationTaskSettings" \
  --output json > {{current-settings}}.json
```

### Update settings to include Logging

```json
{
  "Logging": {
    "EnableLogging": true,
    "LogComponents": [
      {
        "Component": "TARGET_LOAD",
        "Severity": "LOGGER_SEVERITY_DEFAULT"
      },
      {
        "Component": "TARGET_APPLY",
        "Severity": "LOGGER_SEVERITY_DEFAULT"
      },
      {
        "Component": "SOURCE_CAPTURE",
        "Severity": "LOGGER_SEVERITY_DEFAULT"
      },
      {
        "Component": "SOURCE_UNLOAD",
        "Severity": "LOGGER_SEVERITY_DEFAULT"
      }
    ]
  }
}
```

### Apply the modified settings immediately

```sh
aws dms modify-replication-task \
  --replication-task-arn {{replication-task-arn}} \
  --replication-task-settings file://{{current-settings}}.json \
  --apply-immediately
```
