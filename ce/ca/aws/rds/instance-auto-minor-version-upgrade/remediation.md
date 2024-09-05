# Remediation

## Identify the affected AWS RDS Instances

### From Console

- Log in to the AWS management console and navigate to the RDS dashboard at <https://console.aws.amazon.com/rds/>.

- In the left navigation panel, choose Databases.

- Click on the name (link) of the RDS database instance that you want to examine. To identify RDS database instances, check the database role available in the Role column (i.e. Instance).

- Select the Maintenance & backups tab and check the Auto minor version upgrade attribute value. If the Auto minor version upgrade value is set to Disabled, the feature is not enabled, therefore the minor database engine upgrades will not be applied to the selected Amazon RDS database instance.

- Repeat the above steps for each Amazon RDS database instance available within the current AWS region.

- Change the AWS cloud region from the navigation bar and repeat the Audit process for other regions.

### From Command Line

- Run describe-db-instances command (OSX/Linux/UNIX) with custom query filters to list the names of AWS RDS Instances available in the selected AWS region:

```sh
aws rds describe-db-instances
  --region us-east-1
  --output table
  --query 'DBInstances[*].DBInstanceIdentifier | []'
```

- The command output should return a table with the requested database instance names:

```sh
--------------------------------
|     DescribeDBInstances      |
+------------------------------+
|  cc-project5-mysql-database  |
|  cc-prod-postgres-database   |
+------------------------------+
```

- Run describe-db-instances command (OSX/Linux/UNIX) using the name of the database instance that you want to examine as the identifier parameter and custom query filters to describe the Auto Minor Version Upgrade feature status available for the selected instance:

```sh
aws rds describe-db-instances
  --region us-east-1
  --db-instance-identifier cc-project5-mysql-database
  --query 'DBInstances[*].AutoMinorVersionUpgrade'
```

- The command output should return the feature status (true for enabled, false for disabled):

```json
[
    false
]
```

- If the `describe-db-instances` command output returns false, as shown in the output example above, the Auto Minor Version Upgrade feature is not enabled for the selected Amazon RDS database instance.

- Repeat the above steps for each Amazon RDS database instance available in the selected AWS region.

- Change the AWS cloud region by updating the `--region` command parameter value and repeat the process for other regions.

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

~~~
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
~~~

### From Console

- Log in to the AWS management console and navigate to the RDS dashboard at <https://console.aws.amazon.com/rds/>.

- In the left navigation panel, choose Databases.

- Select the Amazon RDS database instance that you want to reconfigure and choose Modify.

- On the Modify DB instance: {{instance-name}} configuration page, perform the following operations:

1. In the Additional configuration section, under Maintenance, select Enable auto minor version upgrade to enable the Auto Minor Version Upgrade feature for the selected database instance. Enabling minor database engine upgrades will automatically upgrade to new minor versions as they are released.

2. Choose Continue and review the configuration changes that you want to apply, available in the Summary of modifications section.

3. In the Scheduling of modifications section, perform one of the following actions based on your workload requirements:

- Select Apply during the next scheduled maintenance window to apply the changes automatically during the next scheduled maintenance window.

- Select Apply immediately to apply the changes right away. With this option any pending modifications will be asynchronously applied as soon as possible, regardless of the maintenance window configured for the selected database instance. Note that any changes available in the pending modifications queue are also applied. If any of the pending modifications require downtime, choosing this option can cause unexpected downtime for your database application.

4. Choose Modify DB instance to apply the configuration changes.

- Repeat the above steps for each Amazon RDS database instance available in the selected AWS region.

- Change the AWS cloud region from the navigation bar and repeat the Remediation process for other regions.

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
  "VpcSecurityGroups": [
   {
    "Status": "active",
    "VpcSecurityGroupId": "sg-0abcd1234abcd1234"
   },
   {
    "Status": "active",
    "VpcSecurityGroupId": "sg-abcdabcd"
   }
  ],
  "InstanceCreateTime": "2021-05-12T08:00:00.677Z",
  "CopyTagsToSnapshot": true,
  "OptionGroupMemberships": [
   {
    "Status": "in-sync",
    "OptionGroupName": "default:mysql-5-7"
   }
  ],
  "PendingModifiedValues": {},
  "Engine": "mysql",
  "MultiAZ": false,
  "DBSecurityGroups": [],
  "DBParameterGroups": [
   {
    "DBParameterGroupName": "default.mysql5.7",
    "ParameterApplyStatus": "in-sync"
   }
  ],
  "PerformanceInsightsEnabled": false,
  "AutoMinorVersionUpgrade": true,
  "PreferredBackupWindow": "06:02-06:32",
  "DBSubnetGroup": {
   "Subnets": [
    {
     "SubnetStatus": "Active",
     "SubnetIdentifier": "subnet-abcd1234",
     "SubnetOutpost": {},
     "SubnetAvailabilityZone": {
      "Name": "us-east-1d"
     }
    },
    {
     "SubnetStatus": "Active",
     "SubnetIdentifier": "subnet-1234abcd",
     "SubnetOutpost": {},
     "SubnetAvailabilityZone": {
      "Name": "us-east-1e"
     }
    },
    {
     "SubnetStatus": "Active",
     "SubnetIdentifier": "subnet-abcdabcd",
     "SubnetOutpost": {},
     "SubnetAvailabilityZone": {
      "Name": "us-east-1b"
     }
    },
    {
     "SubnetStatus": "Active",
     "SubnetIdentifier": "subnet-12341234",
     "SubnetOutpost": {},
     "SubnetAvailabilityZone": {
      "Name": "us-east-1a"
     }
    },
    {
     "SubnetStatus": "Active",
     "SubnetIdentifier": "subnet-abcd1234",
     "SubnetOutpost": {},
     "SubnetAvailabilityZone": {
      "Name": "us-east-1f"
     }
    },
    {
     "SubnetStatus": "Active",
     "SubnetIdentifier": "subnet-1234abcd",
     "SubnetOutpost": {},
     "SubnetAvailabilityZone": {
      "Name": "us-east-1c"
     }
    }
   ],
   "DBSubnetGroupName": "default-vpc-abcdabcd",
   "VpcId": "vpc-abcdabcd",
   "DBSubnetGroupDescription": "Created from the AWS Management Console",
   "SubnetGroupStatus": "Complete"
  },
  "ReadReplicaDBInstanceIdentifiers": [],
  "AllocatedStorage": 50,
  "DBInstanceArn": "arn:aws:rds:us-east-1:123456789012:db:cc-project5-mysql-database",
  "BackupRetentionPeriod": 0,
  "PreferredMaintenanceWindow": "thu:03:27-thu:03:57",
  "Endpoint": {
   "HostedZoneId": "ABCDABCDABCD",
   "Port": 3306,
   "Address": "cc-project5-mysql-database.abcdabcdabcd.us-east-1.rds.amazonaws.com"
  },
  "DBInstanceStatus": "available",
  "IAMDatabaseAuthenticationEnabled": false,
  "EngineVersion": "5.7.30",
  "DeletionProtection": false,
  "AvailabilityZone": "us-east-1a",
  "DomainMemberships": [],
  "StorageType": "gp2",
  "DbiResourceId": "db-ABCDABCDABCDABCDABCDABCDAB",
  "CACertificateIdentifier": "rds-ca-2019",
  "StorageEncrypted": false,
  "AssociatedRoles": [],
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
