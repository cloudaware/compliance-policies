# Remediation

## Enable Point-in-Time Recovery

### **From Command Line**

To enable Point-in-Time Recovery (PITR) for an existing DynamoDB table, use the following AWS CLI command:

```sh
aws dynamodb update-continuous-backups \
    --table-name {{table-name}} \
    --point-in-time-recovery-specification PointInTimeRecoveryEnabled=true
```

### **Using AWS CloudFormation**

For CloudFormation-managed DynamoDB tables, set `PointInTimeRecoverySpecification` on the table resource:

```yaml
Resources:
  DynamoDBTable:
    Type: AWS::DynamoDB::Table
    Properties:
      PointInTimeRecoverySpecification:
        PointInTimeRecoveryEnabled: true
        RecoveryPeriodInDays: 35
```
