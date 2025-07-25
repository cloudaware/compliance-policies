# Remediation

## From Command Line

To enable Point-in-Time Recovery (PITR) for an existing DynamoDB table, use the following AWS CLI command:

```sh
aws dynamodb update-continuous-backups \
    --table-name {{table-name}} \
    --point-in-time-recovery-specification PointInTimeRecoveryEnabled=True 
```

## Using AWS CloudFormation

- CloudFormation template (YAML):

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: Enable Point-in-Time Recovery for an existing DynamoDB table

Parameters:
  TableName:
    Type: String
    Description: Name of the existing DynamoDB table

Resources:
  PointInTimeRecovery:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: !Ref TableName
      PointInTimeRecoverySpecification:
        PointInTimeRecoveryEnabled: true
        RecoveryPeriodInDays: 35
```
