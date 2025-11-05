# Remediation

## Enable Automatic Minor Version Upgrades

### **Using AWS CloudFormation**

- CloudFormation template (YAML):

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: Enables automatic minor version upgrades for an existing RDS cluster.

Parameters:
  DBClusterId:
    Type: String
    Description: ID of the existing RDS cluster

Resources:
  AutoMinorUpgradeRDS:
    Type: AWS::RDS::DBCluster
    Properties:
      DBClusterIdentifier: !Ref DBClusterId
      AutoMinorVersionUpgrade: true
```

### **From Command Line**

```sh
aws rds modify-db-cluster
  --db-cluster-identifier {{cluster-id}}
  --auto-minor-version-upgrade
  [--apply-immediately]
```

To apply the change during the next maintenance window, omit the `--apply-immediately` flag.
