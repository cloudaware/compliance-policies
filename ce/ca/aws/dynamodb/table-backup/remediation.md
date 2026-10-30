# Remediation

## Configure Backup Protection for DynamoDB Tables

When **Point-in-Time Recovery (PITR)** is not enabled, protect DynamoDB tables using either **AWS Backup plans** or scheduled **on-demand backups** to support recovery and meet retention requirements.

### **From Command Line**

#### Option A: Protect the Table Using an AWS Backup Plan

AWS Backup provides centralized scheduling, retention management, and monitoring for DynamoDB backups. If a suitable backup plan does not already exist, create one before assigning the table.

1. **Create an AWS Backup Plan (If Not Already Present)**

    > **Note:** If an existing backup plan already meets organizational backup frequency and retention requirements, this step can be skipped.

    Define the backup plan configuration in a JSON file (for example, `backup-plan.json`). The following example creates a daily backup at **01:00 Pacific Time** with a **365-day retention period**:

    ```json
    {
    "BackupPlan": {
        "BackupPlanName": "dynamodb-backup-plan",
        "Rules": [
        {
            "RuleName": "daily-backup-rule",
            "TargetBackupVaultName": "Default",
            "ScheduleExpression": "cron(0 1 ? * * *)",
            "ScheduleExpressionTimezone": "America/Los_Angeles",
            "StartWindowMinutes": 60,
            "CompletionWindowMinutes": 180,
            "Lifecycle": {
            "DeleteAfterDays": 365
            }
        }
        ]
    }
    }
    ```

    Create the backup plan:

    ```sh
    aws backup create-backup-plan \
        --cli-input-json file://backup-plan.json
    ```

2. **Assign the DynamoDB Table to the Backup Plan**

    ```sh
    aws backup create-backup-selection \
        --backup-plan-id {{backup-plan-id}} \
        --backup-selection '{
            "SelectionName": "DynamoDBTableSelection",
            "IamRoleArn": "{{backup-role-arn}}",
            "Resources": [
                "arn:aws:dynamodb:{{region}}:{{account-id}}:table/{{table-name}}"
            ]
        }'
    ```

    This ensures the table is backed up automatically according to the defined schedule and retention policy.

#### Option B: Create On-Demand Backups on a Schedule

As an alternative to AWS Backup, on-demand backups can be created programmatically using the AWS CLI or SDKs. Automate this process using scheduled jobs, such as EventBridge, Lambda, or CI/CD pipelines, so backups are created before the required 90-day window expires.

Create an on-demand backup for a DynamoDB table:

```sh
aws dynamodb create-backup \
    --table-name {{table-name}} \
    --backup-name {{backup-name}}
```

> **Consideration:**
> To avoid manual intervention, organizations should implement automation that periodically creates and verifies on-demand backups. This approach is suitable for environments that prefer lightweight, table-level control without adopting AWS Backup.
