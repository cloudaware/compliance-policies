# Description

Ensure that RDS database instances have the Auto Minor Version Upgrade flag enabled to receive minor engine upgrades automatically during the specified maintenance window. This allows RDS instances to get new features, bug fixes, and security patches for their database engines.

## Rationale

AWS RDS will occasionally deprecate minor engine versions and provide new ones for an upgrade. When the last version number within the release is replaced, the version change is considered minor. With the Auto Minor Version Upgrade feature enabled, upgrades occur automatically during the specified maintenance window so your RDS instances can get new features, bug fixes, and security patches for their database engines.

## Audit

### From Console

1. Log in to the AWS Management Console and navigate to the RDS dashboard at <https://console.aws.amazon.com/rds/>.
2. In the left navigation panel, click on `Databases`.
3. Select the RDS instance that you want to examine.
4. Click on the `Maintenance and backups` panel.
5. Under the `Maintenance` section, search for the Auto Minor Version Upgrade status.

- If the current status is set to `Disabled`, it means the feature is not set and minor engine upgrades will not be applied to the selected RDS instance.

### From Command Line

1. Run the `describe-db-instances` command to list all RDS database names available in the selected AWS region:

    ```sh
    aws rds describe-db-instances --region {{region}} --query 'DBInstances[*].DBInstanceIdentifier'
    ```

2. The command output should return each database instance identifier.
3. Run the `describe-db-instances` command again using the RDS instance identifier returned earlier to determine the Auto Minor Version Upgrade status for the selected instance:

    ```sh
    aws rds describe-db-instances --region {{region}} --db-instance-identifier {{instance-id}} --query 'DBInstances[*].AutoMinorVersionUpgrade'
    ```

4. The command output should return the current feature status. If the status is set to `true`, the feature is enabled and minor engine upgrades will be applied to the selected RDS instance.

## References

1. <https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_RDS_Managing.html>
2. <https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_UpgradeDBInstance.Upgrading.html>
3. <https://aws.amazon.com/rds/faqs/>
