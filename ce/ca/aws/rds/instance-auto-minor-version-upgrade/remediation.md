# Remediation

## Remediate AWS RDS Instances

### Using AWS CLoudFormation

- CloudFormation template (JSON):

```json
{
 "AWSTemplateFormatVersion": "2010-09-09",
 "Description": "Enable Auto Minor Version Upgrade for Database Instances",
 "Parameters": {
  "DBInstanceName": {
   "Default": "mysql-database-instance",
   "Description": "RDS database instance name",
   "Type": "String",
   "MinLength": "1",
   "MaxLength": "63",
   "AllowedPattern": "^[0-9a-zA-Z-/]*$",
   "ConstraintDescription": "Must begin with a letter and must not end with a hyphen or contain two consecutive hyphens."
  },
  "DBInstanceClass": {
   "Default": "db.t2.small",
   "Description": "DB instance class/type",
   "Type": "String",
   "ConstraintDescription": "Must provide a valid DB instance type."
  },
  "DBAllocatedStorage": {
   "Default": "20",
   "Description": "The size of the database (GiB)",
   "Type": "Number",
   "MinValue": "20",
   "MaxValue": "65536",
   "ConstraintDescription": "Must be between 20 and 65536 GiB."
  },
  "DBName": {
   "Default": "mysqldb",
   "Description": "Database name",
   "Type": "String",
   "MinLength": "1",
   "MaxLength": "64",
   "AllowedPattern": "[a-zA-Z][a-zA-Z0-9]*",
   "ConstraintDescription": "Must begin with a letter and contain only alphanumeric characters."
  },
  "DBUsername": {
   "Description": "Master username for database access",
   "Type": "String",
   "MinLength": "1",
   "MaxLength": "16",
   "AllowedPattern": "[a-zA-Z][a-zA-Z0-9]*",
   "ConstraintDescription": "Must begin with a letter and contain only alphanumeric characters."
  },
  "DBPassword": {
   "NoEcho": "true",
   "Description": "Password for database access",
   "Type": "String",
   "MinLength": "8",
   "MaxLength": "41",
   "AllowedPattern": "[a-zA-Z0-9]*",
   "ConstraintDescription": "Must contain only alphanumeric characters."
  }
 },
 "Resources": {
  "RDSInstance": {
   "Type": "AWS::RDS::DBInstance",
   "Properties": {
    "DBInstanceIdentifier": {
     "Ref": "DBInstanceName"
    },
    "DBName": {
     "Ref": "DBName"
    },
    "MasterUsername": {
     "Ref": "DBUsername"
    },
    "MasterUserPassword": {
     "Ref": "DBPassword"
    },
    "DBInstanceClass": {
     "Ref": "DBInstanceClass"
    },
    "AllocatedStorage": {
     "Ref": "DBAllocatedStorage"
    },
    "Engine": "MySQL",
    "EngineVersion": "5.7.36",
    "AutoMinorVersionUpgrade": true
   }
  }
 }
}
```

- CloudFormation template (YAML):

```yaml
AWSTemplateFormatVersion: '2010-09-09'
  Description: Enable Auto Minor Version Upgrade for Database Instances
  Parameters:
    DBInstanceName:
    Default: mysql-database-instance
    Description: RDS database instance name
    Type: String
    MinLength: '1'
    MaxLength: '63'
    AllowedPattern: ^[0-9a-zA-Z-/]*$
    ConstraintDescription: Must begin with a letter and must not end with a hyphen
        or contain two consecutive hyphens.
    DBInstanceClass:
    Default: db.t2.small
    Description: DB instance class/type
    Type: String
    ConstraintDescription: Must provide a valid DB instance type.
    DBAllocatedStorage:
    Default: '20'
    Description: The size of the database (GiB)
    Type: Number
    MinValue: '20'
    MaxValue: '65536'
    ConstraintDescription: Must be between 20 and 65536 GiB.
    DBName:
    Default: mysqldb
    Description: Database name
    Type: String
    MinLength: '1'
    MaxLength: '64'
    AllowedPattern: '[a-zA-Z][a-zA-Z0-9]*'
    ConstraintDescription: Must begin with a letter and contain only alphanumeric
        characters.
    DBUsername:
    Description: Master username for database access
    Type: String
    MinLength: '1'
    MaxLength: '16'
    AllowedPattern: '[a-zA-Z][a-zA-Z0-9]*'
    ConstraintDescription: Must begin with a letter and contain only alphanumeric
        characters.
    DBPassword:
    NoEcho: 'true'
    Description: Password for database access
    Type: String
    MinLength: '8'
    MaxLength: '41'
    AllowedPattern: '[a-zA-Z0-9]*'
    ConstraintDescription: Must contain only alphanumeric characters.
  Resources:
    RDSInstance:
    Type: AWS::RDS::DBInstance
    Properties:
      DBInstanceIdentifier: !Ref 'DBInstanceName'
      DBName: !Ref 'DBName'
      MasterUsername: !Ref 'DBUsername'
      MasterUserPassword: !Ref 'DBPassword'
      DBInstanceClass: !Ref 'DBInstanceClass'
      AllocatedStorage: !Ref 'DBAllocatedStorage'
      Engine: MySQL
      EngineVersion: 5.7.36
      AutoMinorVersionUpgrade: true
```

### Using Terraform

- Terraform configuration file (.tf):

``` tf
terraform {
 required_providers {
  aws = {
   source  = "hashicorp/aws"
   version = "~> 3.27"
  }
 }

 required_version = ">= 0.14.9"
}

provider "aws" {
 profile = "default"
 region  = "us-east-1"
}

resource "aws_db_instance" "rds-database-instance" {
 allocated_storage     = 20
 engine                = "mysql"
 engine_version        = "5.7"
 instance_class        = "db.t2.small"
 name                  = "mysqldb"
 username              = "ccmysqluser01"
 password              = "ccmysqluserpwd"
 parameter_group_name  = "default.mysql5.7"

 # Enable Auto Minor Version Upgrade for Database Instances
 auto_minor_version_upgrade = true

 apply_immediately = true
}
```

### From Console

1. Log in to the AWS management console and navigate to the RDS dashboard at https://console.aws.amazon.com/rds/.
2. In the left navigation panel, click `Databases`.
3. Select the RDS instance that you want to update.
4. Click on the `Modify` button located at the top right side.
5. On the `Modify DB Instance: <instance identifier>` page, In the `Maintenance` section, select `Auto minor version upgrade` and click the `Yes` radio button.
6. At the bottom of the page, click `Continue`, and check `Apply Immediately` to apply the changes immediately, or select `Apply during the next scheduled maintenance window` to avoid any downtime.
7. Review the changes and click `Modify DB Instance`. The instance status should change from available to modifying and back to available. Once the feature is enabled, the `Auto Minor Version Upgrade` status should change to `Yes`.

### From Command Line

- Run `modify-db-instance command` (OSX/Linux/UNIX) to enable the Auto Minor Version Upgrade feature for the selected Amazon database instance. The following command request example makes use of `--apply-immediately` parameter to apply the configuration changes asynchronously and as soon as possible. Any changes available in the pending modifications queue are also applied with this request. If any of the pending modifications require downtime, choosing this option can cause unexpected downtime for your RDS database application. If you skip adding the `--apply-immediately` parameter to the command request, Amazon RDS will apply your changes during the next maintenance window:

```sh
aws rds modify-db-instance
  --region us-east-1
  --db-instance-identifier cc-project5-mysql-database
  --auto-minor-version-upgrade
  --apply-immediately
```

- The command output should return the configuration metadata for the modified RDS database instance:

```json
{
 "DBInstance": {
  "PubliclyAccessible": true,
  "MasterUsername": "ccadmin",
  "MonitoringInterval": 0,
  "LicenseModel": "general-public-license",
  ---
  "AutoMinorVersionUpgrade": true,
  "PreferredBackupWindow": "06:02-06:32",
  ---
  "DBInstanceClass": "db.t3.medium",
  "DbInstancePort": 0,
  "DBInstanceIdentifier": "cc-project5-mysql-database"
 }
}
```

- Repeat the above steps for each Amazon RDS database instance available in the selected AWS region.

- Change the AWS cloud region by updating the `--region` command parameter value and repeat the process for other regions.

## References

### AWS Documentation

[AWS Trusted Advisor Best Practices (Checks)](https://docs.aws.amazon.com/awssupport/latest/user/fault-tolerance-checks.html#amazon-aurora-db-instance-accessibility)

[Aurora on Amazon RDS](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_Aurora.html)

[Viewing an Amazon Aurora DB Cluster](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html)

[Connecting to an Amazon Aurora DB Cluster](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html)

[Modifying an Amazon RDS DB Instance and Using the Apply Immediately Parameter](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.DBInstance.Modifying.html)

### AWS CLI Documentation

[rds](https://docs.aws.amazon.com/cli/latest/reference/rds/)

[describe-db-clusters](https://docs.aws.amazon.com/cli/latest/reference/rds/describe-db-clusters.html)

[describe-db-instances](https://docs.aws.amazon.com/cli/latest/reference/rds/describe-db-instances.html)

[modify-db-instance](https://docs.aws.amazon.com/cli/latest/reference/rds/modify-db-instance.html)
