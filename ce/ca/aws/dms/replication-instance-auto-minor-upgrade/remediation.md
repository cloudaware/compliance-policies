# Remediation

To enable automatic minor version upgrades for existing DMS replication instances, use one of the following approaches:

## Using AWS CloudFormation

- CloudFormation template (YAML):

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: Enable Auto Minor Version Upgrade on an existing DMS replication instance

Parameters:
  ReplicationInstanceIdentifier:
    Type: String
    Description: ARN of the existing DMS replication instance
  ReplicationInstanceClass:
    Type: String
    Description: DMS instance class (e.g., dms.c4.large)

Resources:
  AutoMinorUpgradeDMS:
    Type: AWS::DMS::ReplicationInstance
    Properties:
      ReplicationInstanceIdentifier: !Ref ReplicationInstanceIdentifier
      ReplicationInstanceClass: !Ref ReplicationInstanceClass
      AutoMinorVersionUpgrade: true
```

**Note**: Ensure that the `ReplicationInstanceArn` parameter matches the target instance’s ARN.

## From Command Line

Run the following command to modify the replication instance:

```sh
aws dms modify-replication-instance \
    --replication-instance-arn {{replication-instance-arn}} \
    --auto-minor-version-upgrade \
    --apply-immediately
```
